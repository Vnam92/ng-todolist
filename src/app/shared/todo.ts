export interface ITodo {
  title: string,
  completed: boolean,
}

export class Todo implements ITodo{
  constructor(
    public title: string,
    public key: string = '',
    public completed: boolean = false,
  ) {}
}
