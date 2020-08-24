import { Component, OnInit } from '@angular/core';
import {StoryModel} from "../../models/story.model";
import {MessageModel} from "../../models/message.model";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {StoryService} from "../../services/story.service";
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  public stories: StoryModel[];
  public favsStories: StoryModel[] = [];
  public likedStories: StoryModel[] = [];
  public messages: MessageModel[] = [];

  currentUser: UserModel;

  constructor(public userService: UserService, public storyService: StoryService, public messageService: MessageService,
              private route: ActivatedRoute) {
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.getUserPromise(idUser).then( v => {
      this.currentUser = v;
      this.storyService.getStoriesByAuthor(this.currentUser.name).then( rep => {
        this.stories = rep;
      });

      this.messageService.getMessagesByAuthor(this.currentUser._id).then( v => {
        this.messages = v;
      });

      for ( let i of this.currentUser.favs){
        this.storyService.returnStoryById(i).then( v => {
          this.favsStories.push(v)
        });
      }

      for ( let i of this.currentUser.likes){
        this.storyService.returnStoryById(i).then( v => {
          this.likedStories.push(v);
        });
      }
    });

  }

  ngOnInit(): void {
  }

  getDirPic(file) {
    return  "../../assets/img/"+ file;
  }

}
