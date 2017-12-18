interface IEvent {
  date: Date;
  name: string;
  reason: string;
}

interface IMonth {
  events: IEvent[];
}

export default class Calendar {

  private months: IMonth[];

  constructor (months: IMonth[]) {
    this.months = months;
  }

  public setMonths (months: IMonth[]): void {
    this.months = months;
  }

  public getMonths (): IMonth[] {
    return this.months;
  }

}
