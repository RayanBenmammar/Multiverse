import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {MessageModel} from "../../models/message.model";
import {MessageService} from "../../services/message.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {

  @Input() id: string;
  public form : FormGroup;
  text: string;
  author: string;
  rate: string;
  completeStoryID: string;
  rated = false;

  @Output() rateValue = new EventEmitter<string>();

  constructor(public formBuilder: FormBuilder, userService: UserService, public messageService: MessageService,
              private _snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      text : new FormControl(''),
      completeStoryID: new FormControl(''),
      author: new FormControl(userService.currentUser._id),
      rate: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.form.controls.completeStoryID.setValue(this.id);
  }

  onSubmit(){
    const message = this.form.getRawValue() as MessageModel;
    if (message.text.length === 0 && message.rate.length === 0){
      this._snackBar.open('Veuillez mettre une note ou un message avant de soumettre', null,{
        duration: 3000,
      });
    }else {
      this.messageService.postMessage(message);
      if (message.rate !== undefined && message.rate !== ''){
        this.rateValue.emit(message.rate)
      }
      this.form.controls.text.setValue('');
      this.form.controls.rate.setValue('');
    }
  }

  formatLabel(value: number) {
    return value + '/5';
  }
}
