export class CompleteStoryModel {
    constructor(
      public _id: string,
      public idStory: string,
      public title: string,
      public authors: string[],
      public context: string,
      public paragraphs: string[],
      public rate: number,
      public rateCount: number
    ) {
    }
  }
