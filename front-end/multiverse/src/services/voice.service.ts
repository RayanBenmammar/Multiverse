import {Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ParagraphModel} from '../models/paragraph.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {VoiceModel} from '../models/voice.model';
import {take} from 'rxjs/operators';

const serverUrl = 'http://localhost:9428/api';


@Injectable({
  providedIn: 'root'
})
export class VoiceService{

  private url = serverUrl + '/audio';

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  /*** The list voices available***/
  private voices: VoiceModel[] = [];

  /*** the observable which contains the list of childre paragraphs***/
  public voices$: BehaviorSubject<VoiceModel[]> = new BehaviorSubject(this.voices);

  getAudiosByIdParagraph(id: string) {
    this.http.get<VoiceModel[]>(this.url + '/findByParagraph/' + id).subscribe(rep => {
      this.voices = rep;
      this.voices$.next(this.voices);
    });
  }

  returnAudiosByIdParagraph(id: string): Promise<VoiceModel[]> {
    return this.http.get<VoiceModel[]>(this.url + '/findByParagraph/' + id).toPromise();
  }

  async postNarration(narration: FormData): Promise<VoiceModel> {
    console.log('trying to post narration');
    return this.http.post<any>(this.url + '/upload', narration)
      .pipe(
        take(1)
      ).toPromise();
  }
}

