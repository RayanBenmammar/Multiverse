import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ParagraphModel} from '../../models/paragraph.model';
import {ParagraphService} from '../../services/paragraph.service';
import {ParagraphComponent} from '../read/paragraph/paragraph.component';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.css']
})
export class ChildrenListComponent implements OnInit {

  public childrenList: ParagraphModel[] = [];

  @Input()
  paragraph: ParagraphModel;

  @Output()
  childEvent = new EventEmitter<ParagraphModel>();

  test: ParagraphModel;
  loaded: Promise<boolean>;

//  private tmpId = '5ecd0da07f28153feca419c6';

  constructor(public paragraphService: ParagraphService, private paragraphRef: MatBottomSheetRef<ParagraphComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.test = data.paragraph;
  }

  ngOnInit(): void {
    this.paragraphService.getChildren(this.test._id);
    this.paragraphService.children$.subscribe((children: ParagraphModel[]) => {
      this.childrenList = children;
      this.loaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data

    });
  }

  chooseNext(child: ParagraphModel){
    this.childEvent.emit(child);
    console.log(this.childrenList.length);
    this.paragraphRef.dismiss(child);
  }

}
