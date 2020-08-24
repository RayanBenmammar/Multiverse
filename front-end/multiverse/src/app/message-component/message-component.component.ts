import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../models/message.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.css']
})
export class MessageComponentComponent implements OnInit {

  picture = "../../assets/img/";
  isLoaded = false;

  @Input() message: MessageModel;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserPromise(this.message.author).then( v => {
      this.picture = this.picture.concat(v.picture);
      this.isLoaded = true;
    });
  }

}
