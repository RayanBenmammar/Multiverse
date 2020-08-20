import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UserModel} from "../../models/user.model";
import {ErrorService} from "../../services/error";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-select-profil',
  templateUrl: './select-profil.component.html',
  styleUrls: ['./select-profil.component.css']
})
export class SelectProfilComponent implements OnInit {
  public usersList: UserModel[] = [];
  pathArray: string[];

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.pathArray = window.location.pathname.split('/').filter( v => v !== '');
    console.log(this.pathArray)
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(user => {
        this.usersList = user  as UserModel [];
      });
  }
  logUser():void {
    console.log(this.usersList);
  }
  getDirPic(file) {
    return  "assets/img/"+ file;
  }
  selectProfil(user){
    if ( this.pathArray[0] === 'completeStories'){
      const url = '/' + this.pathArray[0] +'/' + this.pathArray[1] + '/' + this.pathArray[2]
      this.router.navigateByUrl(url);
      console.log(url)
    }else {
      this.router.navigateByUrl('/feedPage');
    }
    this.userService.selectCurrentUser(user);
  }
}
