import {Component, OnInit} from '@angular/core';
import {CompleteStoryService} from '../../services/completeStory.service';
import {ParagraphService} from '../../services/paragraph.service';
import {CompleteStoryModel} from '../../models/completeStory.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StoryModel} from '../../models/story.model';
import {StoryService} from '../../services/story.service';

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

  constructor(public completeStoryService: CompleteStoryService, public paragraphService: ParagraphService, private route: ActivatedRoute,
              private router: Router, private storyService: StoryService) {
    this.idStory = this.route.snapshot.paramMap.get('idStory');
    this.storyService.getStoryById(this.idStory);
    this.storyService.story$.subscribe((rep: StoryModel) => {
      this.story = rep;
      this.isLoaded = true;
    });
    this.completeStoryService.getCompleteByStoryId(this.idStory);
    this.completeStoryService.completeStories$.subscribe((rep: CompleteStoryModel[]) => {
      this.completesStory = rep;
      this.isLoaded = true;
    });
  }


  ngOnInit(): void {
  }

  selectCompleteStory(completeStory: CompleteStoryModel) {
    this.completeStory = completeStory;
    this.completeStorySelected = true;
    this.router.navigate(['/completeStories/' + this.idStory + '/' + completeStory._id]);
  }
  loadStory(){
    this.router.navigate(['/read/' + this.story._id]);
  }

  getAllTags(story: CompleteStoryModel) {
    const tmp = [];
    for (const p of story.paragraphs){
      /*this.paragraphService.returnParagraphById(p).then( v => {
        console.log(v)
        tmp.push(v.tagsList)
      })*/
      //console.log(p);
    }
    //console.log(tmp);
    return tmp;
  }

}
