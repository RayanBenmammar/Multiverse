export class ParagraphModel {
  constructor(
    public _id: string,
    public description: string,
    public text: string,
    public idStory: string,
    public idParent: string,
    public author: string,
    public endParagraph: boolean,
    public tagsList: string[]
  ) {
  }
}
