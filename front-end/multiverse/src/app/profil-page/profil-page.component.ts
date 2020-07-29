import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {StoryModel} from "../../models/story.model";
import {StoryService} from "../../services/story.service";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  public stories: StoryModel[];

  constructor(public userService: UserService, public storyService: StoryService) {
    this.storyService.getStoriesByAuthor(this.userService.currentUser.name).then( rep => {
      this.stories = rep;
    });
  }

  ngOnInit(): void {
  }

  getDirPic(file) {
    return  "../../assets/img/"+ file;
  }

}
