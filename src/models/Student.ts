import Discipline from "models/Discipline";
import Evaluation from "models/Evaluation";

enum EmailIntegrations {
  fatec,
  etec,
  preferential,
  websai,
}

interface IRegisteredEmail {
  email: string;
  integrations: EmailIntegrations[];
}

interface IAttendance {
  absenses: number;
  presences: number;
}

interface IPartialGrade {
  approved: boolean;
  finalScore: number;
  frequency: number;
  discipline: Discipline;
  evaluations: Evaluation[];
}

interface IPeriod {
  startAt: Date;
  endAt: Date;
  discipline: Discipline;
  classroomCode: string;
}

interface ISchedule {
  weekday: number; // 1 => Monday
  periods: IPeriod[];
}

export default class Student {

  private name: string;
  private registeredEmails: IRegisteredEmail[];
  private partialGrades: IPartialGrade[];
  private enrolledDisciplines: Discipline[] = [];
  private schedules: ISchedule[];

  public isEnrolledAtDiscipline (discipline: Discipline): boolean {
    return this.enrolledDisciplines.filter((_discipline) => _discipline.getCode() === discipline.getCode()).length > 0;
  }

  public setSchedules (schedules: ISchedule[]): void {
    this.schedules = schedules;
  }

  public getSchedules (): any {
    return this.schedules;
  }

  public getEnrolledDisciplineByCode (code: string): Discipline {
    return this.enrolledDisciplines.filter((d) => d.getCode() === code)[0];
  }

  public setName (name: string): void {
    this.name = name;
  }

  public getName (): string {
    return this.name;
  }

  public setRegisteredEmails (registeredEmails: IRegisteredEmail[]): void {
    this.registeredEmails = registeredEmails;
  }

  public getRegisteredEmails (): IRegisteredEmail[] {
    return this.registeredEmails;
  }

  public setPartialGrades (partialGrades: IPartialGrade[]): void {
    this.partialGrades = partialGrades;
  }

  public getPartialGrades (): IPartialGrade[] {
    return this.partialGrades;
  }

  public setEnrolledDisciplines (disciplines: Discipline[]): void {
    disciplines.forEach((discipline) => this.setEnrolledDiscipline(discipline));
  }

  public setEnrolledDiscipline (discipline: Discipline): void {
    if (this.isEnrolledAtDiscipline(discipline)) {
      this.updateDiscipline(discipline);
    } else {
      this.enrolledDisciplines.push(discipline);
    }
  }

  public getEnrolledDisciplineIndexByCode (code: string): number {
    return this.enrolledDisciplines.indexOf(this.getEnrolledDisciplineByCode(code));
  }

  public getEnrolledDisciplines (): Discipline[] {
    return this.enrolledDisciplines;
  }

  private updateDiscipline (discipline: Discipline) {
    const index = this.getEnrolledDisciplineIndexByCode(discipline.getCode());
    this.enrolledDisciplines[index] = Object.assign(this.enrolledDisciplines[index],
                                      JSON.parse(JSON.stringify(discipline)));
  }

}
