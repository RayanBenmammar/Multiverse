import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ParagraphComponent} from '../read/paragraph/paragraph.component';
import {VoiceModel} from '../../models/voice.model';

@Component({
  selector: 'app-voices-list',
  templateUrl: './voices-list.component.html',
  styleUrls: ['./voices-list.component.css']
})
export class VoicesListComponent implements OnInit {

  voices: VoiceModel[] = [];

  constructor(private voiceRef: MatBottomSheetRef<ParagraphComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.voices = data.voices;
  }

  ngOnInit(): void {
  }

  choose(voice: VoiceModel){
    this.voiceRef.dismiss(voice);
  }

}
