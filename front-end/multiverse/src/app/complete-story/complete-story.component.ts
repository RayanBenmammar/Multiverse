import {Component, OnInit, Input} from '@angular/core';
import {CompleteStoryModel} from '../../models/completeStory.model';
import {CompleteStoryService} from '../../services/completeStory.service';
import {ParagraphModel} from '../../models/paragraph.model';
import {ParagraphService} from '../../services/paragraph.service';
import {StarRatingComponent} from 'ng-starrating';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {RateModel} from "../../models/rate.model";
import {StoryService} from "../../services/story.service";


@Component({
  selector: 'app-complete-story',
  templateUrl: './complete-story.component.html',
  styleUrls: ['./complete-story.component.css']
})
export class CompleteStoryComponent implements OnInit {
  paragraphs: ParagraphModel[] = [];
  rate: RateModel = new RateModel(0, 0);
  completesStories: CompleteStoryModel[];
  isLoaded = false;
  rateForm = new FormControl('', [Validators.required]);
  rated = false;

  @Input() completeStory: CompleteStoryModel;
  // @Input() storyId: string;
  //
  // @Input() completeStoryId: string;

  constructor(public completeStoryService: CompleteStoryService, public paragraphService: ParagraphService) {
  }

  ngOnInit(): void {
    // this.completeStoryService.getCompleteById(this.completeStoryId);
    // if (this.completeStoryId === '-1') {
    //   this.completeStoryService.getCompleteByStoryId(this.storyId);
    // } else {
    //   this.completeStoryService.getCompleteById(this.completeStoryId);
    //
    // }
    //
    // this.completeStoryService.completeStory$.subscribe((rep: CompleteStoryModel[]) => {
    //   console.log("rep : " + rep[0]);
    //   this.completesStories = rep;
    //   this.completeStory = this.completesStories[0];
    //   console.log("this complete story : " + this.completeStory);
    //   this.isLoaded = true;
    // });

  }

  onSubmit() {
    if (this.rateForm.valid) {
      console.log("submit");
      if (this.completeStory.rateCount) {

        console.log("dans le if");
        this.rate.rateCount = this.completeStory.rateCount + 1;
        this.rate.rate = (this.rateForm.value + this.completeStory.rate * this.completeStory.rateCount) / this.rate.rateCount;
        this.completeStoryService.putStory(this.rate, this.completeStory._id);
        this.completeStory.rate = this.rate.rate;
        this.completeStory.rateCount = this.rate.rateCount;
      } else {
        console.log("dans le else");
        this.rate.rateCount = 1;

        console.log("1");
        this.rate.rate = this.rateForm.value;
        console.log("2");
        this.completeStoryService.putStory(this.rate, this.completeStory._id);
        this.completeStory.rate = this.rate.rate;
        this.completeStory.rateCount = this.rate.rateCount;
      }
      this.rated = true;


    }

  }

  formatLabel(value: number) {

    return value + '/5';


  }
}
