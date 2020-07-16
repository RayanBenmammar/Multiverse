

export class UserModel {
  constructor(
    public id: number,
    public name?: string,
    public type?: string,
    public description?: string,
    public picture?: string
  ) {}
}
