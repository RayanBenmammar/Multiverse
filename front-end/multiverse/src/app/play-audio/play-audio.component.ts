import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ParagraphComponent} from '../read/paragraph/paragraph.component';
import {serverUrl} from '../../configs/server.config';

@Component({
  selector: 'app-play-audio',
  templateUrl: './play-audio.component.html',
  styleUrls: ['./play-audio.component.css']
})
export class PlayAudioComponent implements OnInit {

  msbapTitle = 'Audio Title';
  msbapAudioUrl = serverUrl + '/audio/get';
  msaapDisplayVolumeControls = true;

  msbapDisplayTitle = false;

  constructor(public dialogRef: MatDialogRef<ParagraphComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.msbapAudioUrl  = this.msbapAudioUrl + '/' + data.voice.filename;
    console.log(this.msbapAudioUrl);
  }

  ngOnInit(): void {
  }

}
