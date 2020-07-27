

export class StoryModel {
  constructor(
    public _id: string,
    public idFirstParagraph: string,
    public title: string,
    public author: string,
    public like: number,
    public literaryGenreList: string[],
    public context?: string,
  ) {}
}
