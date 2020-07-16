import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-select-profil',
  templateUrl: './select-profil.component.html',
  styleUrls: ['./select-profil.component.css']
})
export class SelectProfilComponent implements OnInit {
  public usersList: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
    console.log(this.userService.users)
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

    this.userService.selectCurrentUser(user);
  }
}
