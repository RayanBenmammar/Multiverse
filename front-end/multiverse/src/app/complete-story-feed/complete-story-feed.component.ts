import {Component, OnInit} from '@angular/core';
import {CompleteStoryService} from '../../services/completeStory.service';
import {ParagraphService} from '../../services/paragraph.service';
import {CompleteStoryModel} from "../../models/completeStory.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StoryModel} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-complete-story-feed',
  templateUrl: './complete-story-feed.component.html',
  styleUrls: ['./complete-story-feed.component.css']
})
export class CompleteStoryFeedComponent implements OnInit {

  idStory: string;
  completesStory: CompleteStoryModel[];
  completeStory: CompleteStoryModel;
  story: StoryModel;
  isLoaded = false;
  completeStorySelected = false;

  constructor(public completeStoryService: CompleteStoryService, public paragraphService: ParagraphService, private route: ActivatedRoute, private router: Router, private storyService: StoryService) {
    this.idStory = this.route.snapshot.paramMap.get('idStory');
    console.log("id story : " + this.idStory);
    this.storyService.getStoryById(this.idStory);
    this.storyService.story$.subscribe((rep: StoryModel) => {
      this.story = rep;
      this.isLoaded = true;
    });
    this.completeStoryService.getCompleteByStoryId(this.idStory);
    this.completeStoryService.completeStory$.subscribe((rep: CompleteStoryModel[]) => {
      this.completesStory = rep;
      this.isLoaded = true;
    });
  }


  ngOnInit(): void {
  }

  selectCompleteStory(completeStory: CompleteStoryModel) {
    this.completeStory = completeStory;
    this.completeStorySelected = true;
    console.log("clicked : " + this.completeStory._id + "\n completeStorySelected:  " + this.completeStorySelected);
    //this.router.navigate(['/read/' + this.idStory + '/' + completeStory._id]);
  }
  loadStory(){
    this.router.navigate(['/read/' + this.story._id]);
  }

}
