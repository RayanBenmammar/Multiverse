import {Injectable} from '@angular/core';
import {ParagraphModel} from '../models/paragraph.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {StoryModel} from '../models/story.model';
import {take} from 'rxjs/operators';

const serverUrl = 'http://localhost:9428/api';


@Injectable({
  providedIn: 'root'
})
export class ParagraphService{

  /*** The list of children paragraphs***/
  private childrenParagraphs: ParagraphModel[] = [];

  /*** the observable which contains the list of childre paragraphs***/
  public children$: BehaviorSubject<ParagraphModel[]> = new BehaviorSubject(this.childrenParagraphs);


  /*** Parent paragraph ***/
  private parentParagraph: ParagraphModel ;

  /*** the observable which contains the parent paragraph ***/
  public parent$: BehaviorSubject<ParagraphModel> = new BehaviorSubject(this.parentParagraph);

  /*** single paragraph ***/
  private paragraph: ParagraphModel ;

  /*** the observable which contains the single paragraph ***/
  public paragraph$: BehaviorSubject<ParagraphModel> = new BehaviorSubject(this.paragraph);


  private url = serverUrl + '/paragraphs';

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  /*** récupérer les suites disponibles d'un paragraphe***/
  getChildren(id: string){
    this.http.get<ParagraphModel[]>(this.url + '/findChildren/' + id).subscribe((rep) => {
      this.childrenParagraphs = rep;
      this.children$.next(this.childrenParagraphs);
    });
  }

/*** récupérer le paragraphe parent ***/
  getParent(id: string){
    this.http.get<ParagraphModel>(this.url + '/findParent/' + id).subscribe((rep) => {
      this.parentParagraph = rep;
      this.parent$.next(this.parentParagraph);
    });
  }

  /*** récupérer un paragraphe grâce à son id (observalbe)***/
   getParagraphById(id: string){
    this.http.get<ParagraphModel>(this.url + '/findById/' + id).subscribe((rep) => {
      this.paragraph = rep;
      this.paragraph$.next(this.paragraph);
    });
  }

  /*** récupérer un paragraphe grâce à son id (promise)***/
   returnParagraphById(id: string): Promise<ParagraphModel> {
    return this.http.get<ParagraphModel>(this.url + '/findById/' + id).toPromise();
  }


  /*** publier un paragraphe ***/
  async postParagraph(paragraph: ParagraphModel): Promise<ParagraphModel> {
    console.log('trying to post paragraph : ' + paragraph.description);
    return this.http.post<ParagraphModel>(this.url, paragraph, this.httpOptionsBase)
      .pipe(
        take(1)
      ).toPromise();
  }
}

