import {Component, Input, OnInit} from '@angular/core';
import {StoryModel} from "../../models/story.model";
import {ParagraphService} from "../../services/paragraph.service";
import {CompleteStoryModel} from "../../models/completeStory.model";

@Component({
  selector: 'app-display-storytags-component',
  templateUrl: './display-storytags-component.component.html',
  styleUrls: ['./display-storytags-component.component.css']
})
export class DisplayStorytagsComponentComponent implements OnInit {

  @Input() story: CompleteStoryModel;
  tags: string[] = [];

  constructor(public paragraphService: ParagraphService) {
  }

  ngOnInit(): void {
    for (const p of this.story.paragraphs) {
      this.paragraphService.returnParagraphById(p).then(v => {
        v.tagsList.forEach( x => {
          if (!this.tags.includes(x)) {
            this.tags.push(x);
          }
        });
      });
    }
  }

}
