import Discipline from "models/Discipline";

interface IEntry {
  observation: number;
  discipline: Discipline;
}

export default class History {

  private entries: IEntry[];

  constructor (entries: IEntry[]) {
    this.entries = entries;
  }

  public setEntries (entries: IEntry[]): void {
    this.entries = entries;
  }

  public getEntries (): IEntry[] {
    return this.entries;
  }

}
