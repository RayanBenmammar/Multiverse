import {StoryModel} from '../models/story.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {ErrorService} from './error';
import {CompleteStoryModel} from "../models/completeStory.model";
import {ParagraphModel} from "../models/paragraph.model";


const serverUrl = 'http://localhost:9428/api';


@Injectable({
  providedIn: 'root'
})

export class StoryService {


  /*** The list of stories ***/
  private stories: StoryModel[] = [];

  /*** observable which contains the lsit of stories ***/

  public stories$: BehaviorSubject<StoryModel[]> = new BehaviorSubject(this.stories);

  /*** The list of stories of a user ***/
  private storiesByUser: StoryModel[] = [];

  /*** observable which contains the lsit of stories of a user***/

  public storiesByUser$: BehaviorSubject<StoryModel[]> = new BehaviorSubject(this.storiesByUser);

  /*** single story ***/
  private story: StoryModel ;

  /*** the observable which contains the single story ***/
  public story$: BehaviorSubject<StoryModel> = new BehaviorSubject(this.story);

  private url = serverUrl + '/stories';

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.getStories();
  }

  /*** Récupérer toutes les histoires ***/
  getStories(){
    this.http.get<StoryModel[]>(this.url).subscribe((rep) => {
      this.stories = rep;
      this.stories$.next(this.stories);
    });
  }

  /*** récupérer une histoire grâce à son id ***/
  async getStoryById(id: string){
    this.http.get<StoryModel>(this.url + '/findById/' + id).subscribe((rep) => {
      this.story = rep;
      this.story$.next(this.story);
    });
  }

  /*** récupérer une histoire grâce à son id ***/
  async returnStoryById(id: string): Promise<StoryModel> {
     return this.http.get<StoryModel>(this.url + '/findById/' + id).toPromise();
  }

  /*** récupérer les histoire d'un auteur ***/
  async getStoriesByAuthor(author: string): Promise<StoryModel[]> {
    return await this.http.get<StoryModel[]>(this.url + '/findByAuthor/' + author).toPromise();
  }

  /*** récupérer tous les paragraphes par idStory ***/
  getAllParagraphsByStoryId(id: string): Promise<ParagraphModel[]> {
    return this.http.get<ParagraphModel[]>(this.url + '/findByStory/' + id).toPromise();
  }

  /*** publier une nouvelle histoire***/
  postStory(story: StoryModel): Observable<StoryModel> {
    console.log('trying to post: ' + story.title);
    return this.http.post<StoryModel>(this.url, story, this.httpOptionsBase)
      .pipe(
        take(1)
      );
  }

  /*** mettre à jour une histoire***/
  putStory(story: StoryModel){
    const urlWithId = this.url + '/' + story._id.toString();
    this.http.put<StoryModel>(urlWithId, story, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'put /story by id=${story.id}'))
      ).subscribe();
  }
  /*** mettre à jour une histoire***/
  likeStory(story: StoryModel){
    console.log('put story id : ' + story._id);
    console.log('put story title : ' + story.title);
    const urlWithId = this.url + '/like/' + story._id.toString();
    this.http.put<StoryModel>(urlWithId, story, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'like story by id=${story.id}'))
      ).subscribe();
  }

}
