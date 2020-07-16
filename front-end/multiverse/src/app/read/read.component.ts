import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StoryService} from '../../services/story.service';
import {StoryModel} from '../../models/story.model';
import {ActivatedRoute} from '@angular/router';
import {ParagraphModel} from '../../models/paragraph.model';
import {CompleteStoryService} from '../../services/completeStory.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit, AfterViewInit {

  story: StoryModel;

  complete = false;

  isLoaded = false;

  loaded: Promise<boolean>;

  nextParagraphs: ParagraphModel[] = [];

  datasource: any;


  edit = false;
  // MatPaginator Inputs
  // length = this.nextParagraphs.length + 1;
  pageSize = 3;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public storyService: StoryService, private route: ActivatedRoute, public completeStoryService: CompleteStoryService) {

  }

  ngOnInit(): void {
    const idStory = this.route.snapshot.paramMap.get('idStory');
    this.storyService.getStoryById(idStory).then(r => {
      this.storyService.story$.subscribe((rep: StoryModel) => {
        this.story = rep;
        this.isLoaded = true;
        this.loaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
      });
    }
       );
    this.datasource = new MatTableDataSource<ParagraphModel>(this.nextParagraphs);
    this.datasource.push(this.story.idFirstParagraph);
    this.datasource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }



  showEdit(){
    this.edit = !this.edit;
  }


  addNext(next: ParagraphModel) {
    this.nextParagraphs.push(next);
    this.datasource = this.nextParagraphs;
  }

  setComplete() {
    this.complete = true;
  }

  handlePage(event){
    this.currentPage = event.pageIndex;
    const end = (this.currentPage) * this.pageSize;
    const start = this.currentPage = this.pageSize;
    const part = this.nextParagraphs.slice(start, end);
    this.datasource = part;
    console.log(start);
    console.log(end);
    console.log(part);
    console.log(this.datasource);
    console.log(this.nextParagraphs);
  }


}
