import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SessionService} from '../session/session.service';
import {StorageService} from 'ngx-webstorage-service';
import {Router} from '@angular/router';

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


  public users$: BehaviorSubject<UserModel[]> = new BehaviorSubject(this.users);

  public userViewed$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);


  constructor(private http: HttpClient, private session: SessionService, private router: Router) {
    //this.getJSON();
    this.getAllUsers();
    console.log('actual user' + this.users.toString());
    this.loggedIn = session.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = session.getCurrentUserModel();
    }

    if (!session.isLoggedIn()) {
      this.router.navigateByUrl('/login', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/login']));
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
    return this.users$.pipe(
      tap(_ => console.log('getUser'))
    );
  }

  public getUserPicture(name) {
    for (const user of this.users) {
      if (user.name === name) {
        console.log('picture found : ' + user.name + 'pic name:' + user.picture);
        return user.picture;
      } else { return 'defaultPP.png' ; }

    }
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
    this.session.storeCurrentUser(user as UserModel);
    this.loggedIn = true;
    console.log('user ' + user.name + 'selected ');
    console.log('user Selected : ' + this.currentUser._id);
  }

  public logOut() {
    this.session.logOut();
    this.loggedIn = false;
  }
}
