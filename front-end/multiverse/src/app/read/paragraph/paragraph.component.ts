import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  SimpleChanges,
  OnChanges,
  Inject
} from '@angular/core';
import {ParagraphModel} from '../../../models/paragraph.model';
import {ParagraphService} from '../../../services/paragraph.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ChildrenListComponent} from '../../children-list/children-list.component';
import {VoiceService} from '../../../services/voice.service';
import {VoiceModel} from '../../../models/voice.model';
import {MatDialog} from '@angular/material/dialog';
import {AudioUploadComponent} from '../../audio-upload/audio-upload.component';
import {VoicesListComponent} from '../../voices-list/voices-list.component';
import {PlayAudioComponent} from '../../play-audio/play-audio.component';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit, OnChanges {

  // paragraph: string;
  description: string;
  auteur: string;
  date: string;
  version: number;

 // @Output()
  // deleteParagraph: EventEmitter<string> = new EventEmitter<string>();

  @Input()paragraphId: string;
  @Input()showingComplete: boolean;
  @Input() showEdit: boolean;

  @Output()
  nextEvent = new EventEmitter<ParagraphModel>();

  paragraph: ParagraphModel;

  toggle = false;

  toggleWrite = false;

  toggleUpload = false;

  choosen = false;

  voices: VoiceModel[] = [];


  // tslint:disable-next-line:variable-name
  constructor(public paragraphService: ParagraphService, private _bottomSheet: MatBottomSheet, public  voiceService: VoiceService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.paragraphService.returnParagraphById(this.paragraphId).then(value => this.paragraph = value);
    /*this.paragraphService.paragraph$.subscribe((rep: ParagraphModel) => {
      this.paragraph = rep;
      this.date = new Date().getDate().toString() + '/' + (new Date().getMonth() + 1).toString();
    });*/

        /*this.voiceService.getAudiosByIdParagraph(this.paragraphId);
        this.voiceService.voices$.subscribe(data => {
          this.voices = data;
        });*/
        this.voiceService.returnAudiosByIdParagraph(this.paragraphId).then( value => this.voices = value);
  }

  ngOnChanges(changes: SimpleChanges) {
  // console.log(changes.showEdit);
  // console.log(this.showEdit);
  }


  toggleFunc(){
    this.toggle = !this.toggle;

  }

  showChildren() {
    this.toggleFunc();
    this._bottomSheet.open(ChildrenListComponent, {
      data: { paragraph: this.paragraph },
    });
    this._bottomSheet._openedBottomSheetRef.afterDismissed().subscribe((data) => {
      // console.log(JSON.stringify(data));
      if (data !== undefined) {
        this.receivedNext(data);
      }
    });
  }

  receivedNext(child: ParagraphModel) {
    this.toggleFunc();
    this.choosen = true;
    this.nextEvent.emit(child);
  }

  write(){
    this.toggleWrite = !this.toggleWrite;
  }

  showUploadAudio(){
    // this.toggleUpload = !this.toggleUpload;
    const dialogRef = this.dialog.open(AudioUploadComponent, {
      data: {paragraph: this.paragraph}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.voiceService.returnAudiosByIdParagraph(this.paragraphId).then( value => this.voices = value);
      console.log('The dialog was closed');
    });
  }

  playAudio(voice: VoiceModel){
    const dialogRef = this.dialog.open(PlayAudioComponent, {
      data: {voice, text: this.paragraph.text}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showAllVoicesAvaible() {
    this._bottomSheet.open(VoicesListComponent, {
      data: { voices: this.voices },
    });
    this._bottomSheet._openedBottomSheetRef.afterDismissed().subscribe((data) => {
       console.log(JSON.stringify(data));
       if (data !== undefined) {
        this.playAudio(data as VoiceModel);
      }
    });
  }
}
