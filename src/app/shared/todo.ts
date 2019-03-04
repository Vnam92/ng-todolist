export class Todo {
  constructor(
    public title: string,
    public key: string = '',
    public completed: boolean = false,
  ) {}
}
