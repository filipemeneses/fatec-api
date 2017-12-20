import Discipline from "models/Discipline";

interface IPeriod {
  startAt: Date;
  endAt: Date;
  discipline: Discipline;
}

export default class Schedule {

  private weekday: number;
  private periods: IPeriod[];

  constructor ({weekday, periods}: {weekday: number, periods: IPeriod[]}) {
    this.weekday = weekday;
    this.periods = periods;
  }

  public setWeekday (weekday: number): void {
    this.weekday = weekday;
  }

  public getWeekday (): number {
    return this.weekday;
  }

}
