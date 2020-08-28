import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectProfilComponent} from './select-profil/select-profil.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {WriteComponent} from './write/write.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {ReadComponent} from './read/read.component';
import {FeedPageComponent} from './feed-page/feed-page.component';
import {SessionService} from '../services/session/session.service';
import {SESSION_STORAGE, StorageServiceModule} from 'ngx-webstorage-service';
// import {StorageService} from "angular-webstorage-service/src/storage.service";
import {UserService} from '../services/user/user.service';
import {StoryService} from '../services/story.service';
import {ChildrenListComponent} from './children-list/children-list.component';
import {ParagraphComponent} from './read/paragraph/paragraph.component';
import {StoryComponent} from './story/story.component';
import {MatListModule} from '@angular/material/list';
import {CompleteStoryComponent} from './complete-story/complete-story.component';
import {ParagraphWriteComponent} from './paragraph-write/paragraph-write.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {AudioUploadComponent} from './audio-upload/audio-upload.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { CompleteStoryFeedComponent } from './complete-story-feed/complete-story-feed.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VoicesListComponent } from './voices-list/voices-list.component';
import { PlayAudioComponent } from './play-audio/play-audio.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from "@angular/material/badge";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import { ProfilPageComponent } from './profil-page/profil-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import { WriteMessageComponent } from './write-message/write-message.component';
import { ListMessagesComponent } from './list-messages/list-messages.component';
import { MessageComponentComponent } from './message-component/message-component.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { DisplayStorytagsComponentComponent } from './display-storytags-component/display-storytags-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectProfilComponent,
    HomeComponent,
    HeaderComponent,
    WriteComponent,
    ReadComponent,
    FeedPageComponent,
    ChildrenListComponent,
    ParagraphComponent,
    StoryComponent,
    CompleteStoryComponent,
    ParagraphWriteComponent,
    AudioUploadComponent,
    CompleteStoryFeedComponent,
    VoicesListComponent,
    PlayAudioComponent,
    ProfilPageComponent,
    WriteMessageComponent,
    ListMessagesComponent,
    MessageComponentComponent,
    ProfilUserComponent,
    DisplayStorytagsComponentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        MatCardModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        StorageServiceModule,
        MatListModule,
        MatMenuModule,
        MatSliderModule,
        MatPaginatorModule,
        MatBottomSheetModule,
        NgxAudioPlayerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTabsModule,
        ClipboardModule

    ],
  providers: [
    SessionService,
    UserService,
    StoryService,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
