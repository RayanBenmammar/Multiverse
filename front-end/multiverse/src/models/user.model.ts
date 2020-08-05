

export class UserModel {
  constructor(
    public _id: number,
    public name: string,
    public favs: string[],
    public likes: string[],
    public type?: string,
    public description?: string,
    public picture?: string
  ) {}
}
