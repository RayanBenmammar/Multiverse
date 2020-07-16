import {Component, OnInit, Input, Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VoiceService } from 'src/services/voice.service';
import { UserService } from 'src/services/user/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ParagraphComponent} from '../read/paragraph/paragraph.component';
import {ParagraphModel} from '../../models/paragraph.model';
import {MatSnackBar} from "@angular/material/snack-bar";

const serverUrl = 'http://localhost:9428/api';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})
export class AudioUploadComponent implements OnInit {

  uploadForm: FormGroup;
  msbapTitle = 'Audio Title';
  msbapAudioUrl = serverUrl + '/audio/get';
  msaapDisplayVolumeControls = true;

  msbapDisplayTitle = false;
  title: string;
  public voiceForm: FormGroup;
  private voiceData: FormData;

  // @Input() paragraph: string;

  paragraphDialog: ParagraphModel;


  constructor(public formBuilder: FormBuilder, private voiceService: VoiceService, private userService: UserService,
              public dialogRef: MatDialogRef<ParagraphComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar) {
    this.paragraphDialog = data.paragraph;
  }


  ngOnInit(): void {
    this.voiceForm = this.formBuilder.group({
      narration: [''],
      title: [''],
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.voiceForm.get('narration').setValue(file);
    }
  }

  onTitleGiven(titleIn: string) {
    this.voiceForm.get('title').setValue(titleIn);
  }

  async onSubmit() {
    this.voiceData = new FormData();
    this.voiceData.append('file', this.voiceForm.get('narration').value);
    this.voiceData.append('title', this.voiceForm.get('title').value);
    this.voiceData.append('author', this.userService.currentUser.name);
    this.voiceData.append('idParagraph', this.paragraphDialog._id);
    await this.voiceService.postNarration(this.voiceData).then((data) => {
      this._snackBar.open("Voix bien enregistrée",'Merci :)',
        {
          duration: 2000,
        });
      });
    this.dialogRef.close();
  }

}
