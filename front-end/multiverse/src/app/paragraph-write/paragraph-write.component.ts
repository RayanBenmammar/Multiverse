import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoryModel} from '../../models/story.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StoryService} from '../../services/story.service';
import {ParagraphService} from '../../services/paragraph.service';
import {ParagraphModel} from '../../models/paragraph.model';
import {CompleteStoryService} from '../../services/completeStory.service';
import {CompleteStoryModel} from '../../models/completeStory.model';
import {UserService} from '../../services/user/user.service';
import {ParagraphComponent} from '../read/paragraph/paragraph.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-paragraph-write',
  templateUrl: './paragraph-write.component.html',
  styleUrls: ['./paragraph-write.component.css']
})
export class ParagraphWriteComponent implements OnInit {

  description: string;
  text: string;
  idStory: string;
  idParent: string;
  author: string;
  endParagraph: boolean;
  public paragraphForm: FormGroup;
  public storyForm: FormGroup;

  @Input() story: string;
  @Input() parent: string;

  @Output() published = new EventEmitter<boolean>();


  constructor(public formBuilder: FormBuilder, private paragraphService: ParagraphService, private userService: UserService,
              private completeStoryService: CompleteStoryService,
              private _snackBar: MatSnackBar) {
    this.paragraphForm = this.formBuilder.group({
      description: new FormControl(''),
      text: new FormControl(''),
      idStory: new FormControl(this.story),
      idParent: new FormControl(this.parent),
      author: new FormControl(userService.currentUser.name),
      endParagraph: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.paragraphForm.controls.idStory.setValue(this.story);
    this.paragraphForm.controls.idParent.setValue(this.parent);
  }


  /**
   * Action done when we press the submit button
   * It post the paragraph in the Back-end
   * And if it is the last paragraph, it create a Complete Story
   */
  async onSubmitParagraph() {
    let response: any;
    let isLoaded = false;

    const paragraph = this.paragraphForm.getRawValue() as ParagraphModel;
    if (this.endParagraph) {
      paragraph.endParagraph = true;
    }

    console.log("Sumbit: checked? : " + this.endParagraph);
    await this.paragraphService.postParagraph(paragraph as ParagraphModel).then(
      res => {
        response = res;
        isLoaded = true;
        this._snackBar.open('Paragraphe bien enregistré', 'Merci :)', {
          duration: 2000,
        });
      });
    if (this.endParagraph) {
      console.log('vrmnt ds true');
      const completeStory = await this.getWholeStory(response);
      this.postCompleteStory(completeStory, paragraph.idStory);
    }
    this.quit();
  }

  quit() {
    this.published.emit(true);
  }

  /**
   * This method returns the list of all paragraphs in an array in case this paragraph is the last one
   */
  async getWholeStory(paragraph: ParagraphModel): Promise<ParagraphModel[]> {
    let idParent = paragraph.idParent;
    let parentParagraph: any;
    await this.paragraphService.returnParagraphById(idParent).then(
      res => {
        parentParagraph = res;
      }
    );
    let paragraphs: Array<ParagraphModel> = [];
    paragraphs.push(paragraph);
    while (idParent !== '-1' && idParent !== undefined) {
      console.log(paragraphs)
      parentParagraph = await this.paragraphService.returnParagraphById(idParent);
      paragraphs.push(parentParagraph)
      idParent = (await parentParagraph).idParent;
    }
    paragraphs = paragraphs.reverse();
    return paragraphs;
  }

  /**
   * This method is called to post a Complete Story in the Back-end
   * @param paragraphs --> All paragraphs that formed the complete story
   */
  postCompleteStory(paragraphs: ParagraphModel[], idStory: string) {
    const paragraphList: string[] = [];
    const authorList: string[] = [];
    paragraphs.forEach(function (value) {
      paragraphList.push(value._id);
      authorList.push(value.author);
    });

    this.storyForm = this.formBuilder.group({
      idStory: new FormControl(idStory),
      title: new FormControl('Histoire complète'),
      authors: new FormControl(authorList),
      context: new FormControl(''),
      paragraphs: new FormControl(paragraphList),
    });
    const newStory = this.storyForm.getRawValue() as CompleteStoryModel;
    newStory.rate = 0;
    newStory.rateCount = 0;

    this.completeStoryService.postCompletStory(newStory).subscribe(
      res => {
      }
    );
  }

  toggle($event: MatCheckboxChange) {
    console.log($event.checked);
    this.endParagraph = $event.checked;

  }
}
