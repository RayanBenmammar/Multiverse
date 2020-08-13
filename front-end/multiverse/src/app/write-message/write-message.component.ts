import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {MessageModel} from "../../models/message.model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {

  @Input() id: string;
  public form : FormGroup;
  text : string;
  author: string;
  completeStoryID: string;

  constructor(public formBuilder: FormBuilder, userService: UserService, public messageService: MessageService) {
    this.form = this.formBuilder.group({
      text : new FormControl(''),
      completeStoryID: new FormControl(''),
      author: new FormControl(userService.currentUser._id)
    });
  }

  ngOnInit(): void {
    this.form.controls.completeStoryID.setValue(this.id);
  }

  onSubmit(){
    const message = this.form.getRawValue() as MessageModel;
    this.messageService.postMessage(message);
    this.form.controls.text.setValue('');
  }
}
