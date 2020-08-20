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
import {StoryModel} from "../../models/story.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {SessionService} from "../../services/session/session.service";


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

  //@Input() completeStory: CompleteStoryModel;
  //@Input() story: StoryModel;
  // @Input() storyId: string;
  //
  // @Input() completeStoryId: string;

  story: StoryModel;
  completeStory: CompleteStoryModel;
  idCompleteStory: string;

  constructor(private sessionService: SessionService, public completeStoryService: CompleteStoryService, public storyService: StoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idStory = this.route.snapshot.paramMap.get('idStory');
    this.idCompleteStory = this.route.snapshot.paramMap.get('idCompleteStory');

    this.storyService.getStoryById(idStory).then( value => {
      this.storyService.story$.subscribe((rep: StoryModel) => {
        this.story = rep;
      });
    })
    this.completeStoryService.getCompleteById(this.idCompleteStory);
    this.completeStoryService.completeStory$.subscribe((rep: CompleteStoryModel) => {
      this.completeStory = rep;
      this.isLoaded = true;
    });
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
      if (this.completeStory.rateCount) {


        this.rate.rateCount = this.completeStory.rateCount + 1;
        this.rate.rate = (this.rateForm.value + this.completeStory.rate * this.completeStory.rateCount) / this.rate.rateCount;
        this.completeStoryService.putStory(this.rate, this.completeStory._id);
        this.completeStory.rate = this.rate.rate;
        this.completeStory.rateCount = this.rate.rateCount;
      } else {

        this.rate.rateCount = 1;


        this.rate.rate = this.rateForm.value;

        this.completeStoryService.putStory(this.rate, this.completeStory._id);
        this.completeStory.rate = this.rate.rate;
        this.completeStory.rateCount = this.rate.rateCount;
      }
      this.rated = true;


    }

  }

  addRate(rate: string){
    if (this.completeStory.rateCount) {
      this.rate.rateCount = this.completeStory.rateCount + 1;
      this.rate.rate = (parseInt(rate, 10) + this.completeStory.rate * this.completeStory.rateCount) / this.rate.rateCount;
      this.completeStoryService.putStory(this.rate, this.completeStory._id);
      this.completeStory.rate = this.rate.rate;
      this.completeStory.rateCount = this.rate.rateCount;
    } else {

      this.rate.rateCount = 1;
      this.rate.rate = parseInt(rate, 10);
      this.completeStoryService.putStory(this.rate, this.completeStory._id);
      this.completeStory.rate = this.rate.rate;
      this.completeStory.rateCount = this.rate.rateCount;
    }
  }

  formatLabel(value: number) {

    return value + '/5';


  }
}
