import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../models/message.model";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.css']
})
export class MessageComponentComponent implements OnInit {

  picture = "../../assets/img/";
  isLoaded = false;

  @Input() message: MessageModel;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserPromise(this.message.author).then( v => {
      this.picture = this.picture.concat(v.picture);
      this.isLoaded = true;
    });
  }

  goToProfil(){
    this.router.navigate(['/profilUser/' + this.message.author]);

  }

}
