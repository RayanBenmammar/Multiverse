import { Component, OnInit } from '@angular/core';
import {StoryModel} from '../../models/story.model';
import {Router} from '@angular/router';
import {StoryService} from '../../services/story.service';
import {UserService} from '../../services/user/user.service';
import {ParagraphModel} from '../../models/paragraph.model';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  public storyList: StoryModel[] = [];
  public storiesByUser: StoryModel[] = [];
  public selectedOption: string;
  public selected: string;

  constructor( public storyService: StoryService, public userService: UserService) {

  }

  ngOnInit(): void {
    this.storyService.stories$.subscribe((stories: StoryModel[]) => {
    this.storyList = stories;
    });
    if (this.userService.currentUser.name !== null) {
     this.storyService.getStoriesByAuthor(this.userService.currentUser.name).then( rep => {
       this.storiesByUser = rep;
       // différences des 2 listes
       this.storyList =  this.storyList.filter( x => !this.storiesByUser.some(y => y._id === x._id));
     });
    }
  }

  randomStory(): void {
    console.log('Bonjour');
  }

  sortFeedAllStories() {
    console.log(this.selected);
    switch (this.selected) {
      case 'name':
        this.sortByNameAllStories('title');
        break;
      case 'popularity':
        this.sortJSONpopularity(this.storyList, 'like').reverse();
        break;
      case 'author':
        this.sortByNameAllStories('author');
        break;
      default:
        //Mettre une pop-up pour dire de séléctionner quelque chose
        break;
    }
  }

  sortFeedMyStories() {
    console.log(this.selected);
    switch (this.selected) {
      case 'name':
        this.sortByNameMyStories('title');
        break;
      case 'popularity':
        this.sortJSONpopularity(this.storiesByUser, 'like').reverse();
        break;
      case 'author':
        this.sortByNameMyStories('author');
        break;
      default:
        //Mettre une pop-up pour dire de séléctionner quelque chose
        break;
    }
  }

  sortByNameAllStories(key) {
    console.table(this.storyList);
    this.sortJSON(this.storyList, key);
  }

  sortByNameMyStories(key) {
    console.table(this.storiesByUser);
    this.sortJSON(this.storiesByUser, key);
  }

  sortJSON(data, key) {
    return data.sort(function (a, b) {
      var x = ('' + a[key]).toUpperCase();
      var y = ('' + b[key]).toUpperCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  sortJSONpopularity(data, key) {
    return data.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (x == undefined) x = 0;
      if (y == undefined) y = 0;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}
