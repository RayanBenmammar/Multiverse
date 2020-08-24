import { Component, OnInit } from '@angular/core';
import {StoryModel} from '../../models/story.model';
import {Router} from '@angular/router';
import {StoryService} from '../../services/story.service';
import {UserService} from '../../services/user/user.service';
import {ParagraphModel} from '../../models/paragraph.model';
import {LiteraryGenre} from '../../models/literaryGenre.enum';
import {FormControl} from '@angular/forms';
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  public storyList: StoryModel[] = [];
  public storiesByUser: StoryModel[] = [];
  public favsStories: StoryModel[] =[];

  public selectedOption: string;
  public selected: string;
  tagsList = Object.values(LiteraryGenre);
  tags = new FormControl();
  selectedTags = [];

  currentUser: UserModel;

  constructor( public storyService: StoryService, public userService: UserService) {
    this.tagsList.splice(this.tagsList.length / 2, this.tagsList.length);

    this.userService.currentUser$.subscribe( v => {
      this.currentUser = v;
      const tmp = []
      for ( let i of this.currentUser.favs){
        this.storyService.returnStoryById(i).then( x => {
          tmp.push(x)
          const filtered = this.favsStories.filter( rep => tmp.includes(rep))
          const difference = tmp.filter( value => !filtered.includes(value));
          this.favsStories = [...new Set([...filtered, ...difference])];
        });
      }

    });

  }

  ngOnInit(): void {
    this.storyService.stories$.subscribe((stories: StoryModel[]) => {
    this.storyList = stories;
    });
    if (this.currentUser.name !== null) {
     this.storyService.getStoriesByAuthor(this.currentUser.name).then( rep => {
       this.storiesByUser = rep;
       // différences des 2 listes
       this.storyList =  this.storyList.filter( x => !this.storiesByUser.some(y => y._id === x._id));
     });
    }
  }

  randomStory(): void {
    console.log('Bonjour');
  }

  sortStories(list) {
    console.log(this.selected);
    switch (this.selected) {
      case 'name':
        this.sortByNameAllStories('title', list);
        break;
      case 'popularity':
        this.sortJSONpopularity(list, 'like').reverse();
        break;
      case 'author':
        this.sortByNameAllStories('author', list);
        break;
      default:
        //Mettre une pop-up pour dire de séléctionner quelque chose
        break;
    }
  }


  sortByNameAllStories(key, list) {
    console.table(list);
    this.sortJSON(list, key);
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


  onTagsSelection(){
    console.log(this.selectedTags);
  }

  checkTags(story) {
    if (this.selectedTags.length === 0) return true;
    const tmp = story.literaryGenreList;
    for ( let t of this.selectedTags) {
      if (tmp.includes(t)) { return true ; }
    }
    return false
  }

}
