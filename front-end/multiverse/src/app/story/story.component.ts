import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {StoryModel} from '../../models/story.model';
import {StoryService} from '../../services/story.service';
import {CompleteStoryModel} from '../../models/completeStory.model';
import {CompleteStoryService} from "../../services/completeStory.service";
import {ParagraphModel} from "../../models/paragraph.model";
import {UserService} from "../../services/user/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() story: StoryModel;
  likes: number;
  completesStories: CompleteStoryModel[] = [];
  paragraphs: ParagraphModel[];
  paragraphsLength: number;
  picture = 'defaultPP.png';
  favToggle = false;
  likeToggle = false;

  constructor(private router: Router, private storyService: StoryService, private completeStoryService: CompleteStoryService,
              private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.completeStoryService.getAllCompleteByStoryId(this.story._id).then(data => {
      this.completesStories = data;
    });
    await this.storyService.getAllParagraphsByStoryId(this.story._id).then(data => {
      this.paragraphs = data;
    });
    this.countParagraphs();
    if (typeof this.story.like !== 'undefined') {
      this.likes = this.story.like;
    } else {
      this.likes = 0;
    }
   // this.picture = this.userService.getUserPicture(this.story.author);

    this.favToggle = this.userService.currentUser.favs.includes(this.story._id);

    this.likeToggle = this.userService.currentUser.likes.includes(this.story._id);

  }

  loadStory() {
    this.router.navigate(['/read/' + this.story._id]);
  }

  loadCompleteStories() {
    this.router.navigate(['/completeStories/' + this.story._id]);
  }

  like() {

    if (!this.likeToggle) {
      this.userService.currentUser.likes.push(this.story._id);
      this.userService.putLikes(this.userService.currentUser);
      this.story.like = this.story.like + 1;
      this.likes = this.story.like;
    }else {
      const filtered = this.userService.currentUser.likes.filter(v => { return v !== this.story._id; });
      this.userService.currentUser.likes = filtered;
      this.userService.putLikes(this.userService.currentUser);
      this.story.like = this.story.like - 1;
      this.likes = this.story.like;
    }
    this.likeToggle = !this.likeToggle;
   /* if (this.story.like) {
      this.story.like = this.story.like + 1;
      this.likes = this.story.like;

    } else {
      this.story.like = 1;
      this.likes = 1;
    }*/

    this.storyService.likeStory(this.story);
  }

  countParagraphs() {
    this.paragraphsLength = this.paragraphs.length;
  }

  getDirPic(file) {
    console.log('assets/img/' + file);
    return 'assets/img/' + file;
  }

  addFav(){
   // const tmp = []
    //tmp.push(this.story._id)
    //this.userService.currentUser.favs = tmp
    if (!this.favToggle) {
      this.userService.currentUser.favs.push(this.story._id)
      this.userService.putFavs(this.userService.currentUser)
    } else {
        const filtered = this.userService.currentUser.favs.filter(v => { return v !== this.story._id; });
        this.userService.currentUser.favs = filtered;
        this.userService.putFavs(this.userService.currentUser)
    }
    this.favToggle = !this.favToggle;
  }
}
