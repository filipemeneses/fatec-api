export default class Student {

  public name: string;

  public setName (name: string): void {
    this.name = name;
  }

  public getName (): string {
    return this.name;
  }
}
