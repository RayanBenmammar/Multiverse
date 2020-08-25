import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {StoryModel} from "../../models/story.model";
import {StoryService} from "../../services/story.service";
import {UserModel} from "../../models/user.model";
import {MessageService} from "../../services/message.service";
import {MessageModel} from "../../models/message.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  public stories: StoryModel[];
  public favsStories: StoryModel[] = [];
  public likedStories: StoryModel[] = [];
  public userFavs: UserModel[] = [];
  public messages: MessageModel[] = [];

  currentUser: UserModel;

  constructor(public userService: UserService, public storyService: StoryService, public messageService: MessageService,
              private router: Router) {
    this.storyService.getStoriesByAuthor(this.userService.currentUser.name).then( rep => {
      this.stories = rep;
    });

    this.messageService.getMessagesByAuthor(this.userService.currentUser._id).then( v => {
      this.messages = v;
    });

    this.userService.currentUser$.subscribe( v => {
      this.currentUser = v;
      this.favsStories = []
      for ( let i of this.currentUser.favs){
        this.storyService.returnStoryById(i).then( v => {
          this.favsStories.push(v)
        });
      }

      this.likedStories = []
      for ( let i of this.currentUser.likes){
        this.storyService.returnStoryById(i).then( v => {
          this.likedStories.push(v)
        });
      }

      this.userFavs = []
      for ( let i of this.currentUser.userFavs){
        this.userService.getUserPromise(i).then( v=> {
          this.userFavs.push(v)
        });
      }
    });
  }

  ngOnInit(): void {
  }

  getDirPic(file) {
    return  "../../assets/img/"+ file;
  }

  goToProfil(user: UserModel){
    if( user._id !== this.userService.currentUser._id){
      this.router.navigate(['/profilUser/' + user._id]);
    }else {
      this.router.navigate(['/profilPage']);
    }

  }

}
