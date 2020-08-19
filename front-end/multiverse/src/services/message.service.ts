import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageModel} from "../models/message.model";

const serverUrl = 'http://localhost:9428/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService{

  private messages: MessageModel[] = [];


  public messages$: BehaviorSubject<MessageModel[]> = new BehaviorSubject(this.messages);

  private url = serverUrl + '/messages';

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){
  }


  async getAllMessages(id: string) {
    await this.http.get<MessageModel[]>(this.url + '/completeStoryId/' + id).subscribe((rep) => {
      this.messages = rep;
      this.messages$.next(this.messages);
    });
  }

  clearMessages() {
    this.messages = [];
    this.messages$.next(this.messages);
  }



  postMessage(message: MessageModel){
    this.http.post<MessageModel>(this.url, message, this.httpOptionsBase).subscribe((rep => {
      console.log(rep);
      this.getAllMessages(message.completeStoryID);
    }));
  }

}
