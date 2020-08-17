import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {MessageModel} from "../../models/message.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {

  @Input() id: string;
  messagesList: MessageModel[] = [];


  constructor(private messageService: MessageService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.messageService.clearMessages();
    this.messageService.getAllMessages(this.id).then( rep => {
      this.messageService.messages$.subscribe( v => {
        this.messagesList = v.reverse();
      });
    });
  }

}
