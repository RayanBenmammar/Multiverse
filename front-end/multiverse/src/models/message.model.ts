export class MessageModel {
  constructor(
    public _id: string,
    public text: string,
    public completeStoryID: string,
    public author: string,
    public rate: string,
  ) {
  }
}
