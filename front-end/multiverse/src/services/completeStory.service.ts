import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CompleteStoryModel} from '../models/completeStory.model';
import {catchError, take} from 'rxjs/operators';
import {StoryModel} from "../models/story.model";
import {RateModel} from "../models/rate.model";
import {ErrorService} from "./error";

const serverUrl = 'http://localhost:9428/api';


@Injectable({
  providedIn: 'root'
})
export class CompleteStoryService {

  /*** Complete story***/
  private completeStory: CompleteStoryModel;

  /*** the observable which contains the complet story***/
  public completeStory$: BehaviorSubject<CompleteStoryModel> = new BehaviorSubject(this.completeStory);

  /*** Complete story***/
  private completeStories: CompleteStoryModel[];

  /*** the observable which contains the complet story***/
  public completeStories$: BehaviorSubject<CompleteStoryModel[]> = new BehaviorSubject(this.completeStories);

  private url = serverUrl + '/completestories';

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  /*** récupérer une histoire complère grâce à son id ***/
  getCompleteById(id: string) {
    this.http.get<CompleteStoryModel>(this.url + '/findById/' + id).subscribe((rep) => {
      this.completeStory = rep;
      this.completeStory$.next(this.completeStory);
      //console.log('getCompleteById : ' + JSON.stringify(rep));
    });
  }

  /***récupérer toutes les histoires complètes d'une Story ***/
  getCompleteByStoryId(id: string) {
    this.http.get<CompleteStoryModel[]>(this.url + '/findByStoryId/' + id).subscribe((rep) => {
      this.completeStories = this.sortJSONvalue(rep, "rate").reverse();
      this.completeStories$.next(this.completeStories);
    });
  }

  /***récupérer toutes les histoires complètes d'une Story ***/
  getAllCompleteByStoryId(id: string): Promise<CompleteStoryModel[]> {
    return this.http.get<CompleteStoryModel[]>(this.url + '/findByStoryId/' + id).toPromise();
  }

  /*** publier une nouvelle histoire complète***/
  postCompletStory(completeStory: CompleteStoryModel): Observable<CompleteStoryModel> {
    console.log('trying to post complete story : ' + JSON.stringify(completeStory));
    console.log(this.url);
    return this.http.post<CompleteStoryModel>(this.url, completeStory, this.httpOptionsBase)
      .pipe(
        take(1)
      );
  }


  /*** mettre à jour une histoire complète***/
  putStory(rate: RateModel, id) {
    console.log('put rate  : ' + rate.rate);
    console.log('put rate count : ' + rate.rateCount);
    const urlWithId = this.url + '/' + id;
    this.http.put<StoryModel>(urlWithId, rate, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'put /completeStory by id=${story.id}'))
      ).subscribe();
  }

  private sortJSONvalue(data, key) {
    return data.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (x == undefined) x = 0.0;
      if (y == undefined) y = 0.0;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}

