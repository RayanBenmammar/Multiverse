import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {StoryModel} from '../../models/story.model';
import {StoryService} from '../../services/story.service';
import {ParagraphModel} from '../../models/paragraph.model';
import {ParagraphService} from '../../services/paragraph.service';
import {LiteraryGenre} from "../../models/literaryGenre.enum";


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  storyCreated = false;
  story: StoryModel;
  idStory: string;
  title: string;
  context: string;
  description: string;
  type: string;
  text: string;
  author: string;
  public storyForm: FormGroup;
  public paragraphForm: FormGroup;
  literaryGenreList: string[];
  tagsList = Object.values(LiteraryGenre);


  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, private userService: UserService, private storyService: StoryService,
              private paragraphService: ParagraphService) {
    this.tagsList.splice(this.tagsList.length / 2, this.tagsList.length);
    this.storyForm = this.formBuilder.group({
      title: new FormControl('', [ Validators.required]),
      // type: new FormControl('', [ Validators.required]),
      context: new FormControl(''),
      // description: new FormControl(''),
      // story: new FormControl(''),
      literaryGenreList: new FormControl(''),
      author: new FormControl(userService.currentUser.name),

    });
    this.paragraphForm = this.formBuilder.group({
       description: new FormControl(''),
       text: new FormControl(''),
       author: new FormControl(userService.currentUser.name),

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const resource = JSON.stringify(this.storyForm.value);
    console.log('Add Button clicked: ' + resource);
    if (this.storyForm.valid) {
      // this.profilForm.patchValue({accepted: 'false'});
     // this.storyForm.setValue()
      const story = this.storyForm.getRawValue() as StoryModel;

      story.idFirstParagraph = 'test1';
      this.story = story;
      console.log('the story : ' + story.literaryGenreList);
      this.storyService.postStory(story as StoryModel).subscribe(
        res => {
          console.log(res);
          this.storyCreated  = true;
          this.idStory = res._id;
          this.story._id = res._id;
          console.log('id Story' + this.idStory);
        }
      );
    }

  }
  onSubmitParagraph() {
    const resource = JSON.stringify(this.storyForm.value);
    console.log('Add Button clicked: ' + resource);
    if (this.storyForm.valid) {
      const paragraph = this.paragraphForm.getRawValue() as ParagraphModel;
      paragraph.idStory = this.idStory;
      console.log('the story : ' + paragraph.description);
      this.paragraphService.postParagraph(paragraph as ParagraphModel).then(
        res => {
          console.log(res);

          this.idStory = res._id;
          this.story.idFirstParagraph = res._id;

          this.storyService.putStory(this.story);
          console.log('id Story' + this.idStory);
        }
      );
    }

  }
}
