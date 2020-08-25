

export class UserModel {
  constructor(
    public _id: string,
    public name: string,
    public favs: string[],
    public likes: string[],
    public userFavs: string[],
    public type?: string,
    public description?: string,
    public picture?: string
  ) {}
}
