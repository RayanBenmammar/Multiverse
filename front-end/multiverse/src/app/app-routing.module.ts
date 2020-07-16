import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SelectProfilComponent} from './select-profil/select-profil.component';
import {WriteComponent} from './write/write.component';
import {ReadComponent} from './read/read.component';
import {FeedPageComponent} from './feed-page/feed-page.component';
import {ChildrenListComponent} from './children-list/children-list.component';
import {CompleteStoryFeedComponent} from "./complete-story-feed/complete-story-feed.component";


const routes: Routes = [    {
  path: 'read/:idStory',
  component: ReadComponent
}, {
  path: 'completeStories/:idStory',
  component: CompleteStoryFeedComponent
},
  {
    path: 'children',
    component:  ChildrenListComponent
  },
  {
  path: 'feedPage',
  component:  FeedPageComponent
},
  {
    path: 'home',
    component:  HomeComponent
}, {
  path: 'profil',
  component:  SelectProfilComponent
}, {
  path: 'write',
  component:  WriteComponent
},
  {
    path: '**',
    redirectTo: 'profil'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
