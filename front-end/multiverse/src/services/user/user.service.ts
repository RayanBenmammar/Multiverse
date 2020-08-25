import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, take, tap} from 'rxjs/operators';
import {SessionService} from '../session/session.service';
import {StorageService} from 'ngx-webstorage-service';
import {ActivatedRoute, Router} from '@angular/router';
import {StoryModel} from "../../models/story.model";
import {httpOptionsBase} from "../../configs/server.config";
import {ErrorService} from "../error";

const serverUrl = 'http://localhost:9428/api';


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private jsonURL = './assets/mocks/userMocks.json';
  private url = serverUrl + '/users';
  currentUser: UserModel;
  users: UserModel[] = [];
  loggedIn: boolean;

  private httpOptionsBase = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public users$: BehaviorSubject<UserModel[]> = new BehaviorSubject(this.users);

  public currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.currentUser);


  constructor(private http: HttpClient, private session: SessionService, private router: Router, private route: ActivatedRoute,
              private errorService: ErrorService) {
    //this.getJSON();
    this.getAllUsers();
    this.loggedIn = session.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = session.getCurrentUserModel();
      this.currentUser$.next(this.currentUser);
    }

    if (!session.isLoggedIn()) {
        this.router.navigateByUrl('/login', {skipLocationChange: true, replaceUrl: false} )
    }
  }


  public getJSON() {
    this.http.get(this.jsonURL).subscribe((user: UserModel[]) => {
      this.users$.next(user);
      this.users = user;
    });
  }

  public getAllUsers(){
    this.http.get<UserModel[]>(this.url).subscribe ( (rep ) => {
      this.users$.next(rep);
      this.users = rep;
    })
  }

  public getUsers(): Observable<UserModel[]> {
    //this.getJSON();
    this.getAllUsers()
    return this.users$
  }

  public getUserPicture(name) {
    for (const user of this.users) {
     if (user.name === name) {
       //console.log('picture found : ' + user.name + 'pic name:' + user.picture);
       return user.picture;
     } else { return 'defaultPP.png' ; }
   }
  }


  public getUserPromise(id): Promise<UserModel>{
   return  this.http.get<UserModel>(this.url + '/findById/' + id).toPromise();
  }

  public putUser(bodyRequest) {
    this.http.put(this.jsonURL, bodyRequest);
    this.getJSON();
  }

  public logUser() {
    console.log(this.users);
    console.log(this.users$);
  }

  public selectCurrentUser(user) {
    this.currentUser = user as UserModel;
    this.currentUser$.next(this.currentUser)
    this.session.storeCurrentUser(user as UserModel);
    this.loggedIn = true;
    console.log('user ' + user.name + 'selected ');
    console.log('user Selected : ' + this.currentUser._id);
  }

  public logOut() {
    this.session.logOut();
    this.loggedIn = false;
  }

  public putFavs(user: UserModel){
    const urlWithId = this.url + '/favs/' + user._id;
    this.http.put<UserModel>(urlWithId, user, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'put /user by id=${user.id}'))
      ).subscribe();
    this.currentUser = user;
    this.currentUser$.next(this.currentUser);
    this.session.storeCurrentUser(user as UserModel);
  }

  public putUserFavs(user: UserModel){
    const urlWithId = this.url + '/userFavs/' + user._id;
   this.http.put<UserModel>(urlWithId, user, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'put /user by id=${user.id}'))
      ).subscribe();
    this.currentUser = user;
    this.currentUser$.next(this.currentUser);
    this.session.storeCurrentUser(user as UserModel);
  }

  public putLikes(user: UserModel){
    const urlWithId = this.url + '/likes/' + user._id
    this.http.put<UserModel>(urlWithId, user, this.httpOptionsBase)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<StoryModel>(err, 'put /user by id=${user.id}'))
      ).subscribe();
    this.currentUser = user;
    this.currentUser$.next(this.currentUser);
    this.session.storeCurrentUser(user as UserModel);
  }
}
