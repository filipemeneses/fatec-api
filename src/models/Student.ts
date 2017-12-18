import Calendar from "models/Calendar";
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

interface IHistoryEntry {
  discipline: Discipline;
  period: string;
  grade: string;
  frequency: number;
  absenses: number;
  approved: boolean;
  observation: string;
}

interface ISchoolGradeEntry {
  number: number;
  disciplines: Discipline[];
}

interface IProfile {
  averageGrade: number;
  birthday: Date;
  code: string;
  course: string;
  cpf: string;
  email: string;
  name: string;
  period: string;
  progress: number;
  unit: string;
}

export default class Student {

  private averageGrade: number;
  private name: string;
  private birthday: Date;
  private code: string;
  private course: string;
  private cpf: string;
  private email: string;
  private period: string;
  private progress: number;
  private unit: string;

  private registeredEmails: IRegisteredEmail[];
  private partialGrades: IPartialGrade[];
  private enrolledDisciplines: Discipline[] = [];
  private schedules: ISchedule[];
  private history: IHistoryEntry[];
  private schoolGrade: ISchoolGradeEntry[];
  private academicCalendar: Calendar;

  public isEnrolledAtDiscipline (discipline: Discipline): boolean {
    return this.enrolledDisciplines.filter((_discipline) => _discipline.getCode() === discipline.getCode()).length > 0;
  }

  public setProfile (profile: IProfile): void {
    this.averageGrade = profile.averageGrade;
    this.birthday = profile.birthday;
    this.code = profile.code;
    this.course = profile.course;
    this.cpf = profile.cpf;
    this.email = profile.email;
    this.name = profile.name;
    this.period = profile.period;
    this.progress = profile.progress;
    this.unit = profile.unit;
  }

  public getProfile (): IProfile {
    return {
      averageGrade: this.averageGrade,
      birthday: this.birthday,
      code: this.code,
      course: this.course,
      cpf: this.cpf,
      email: this.email,
      name: this.name,
      period: this.period,
      progress: this.progress,
      unit: this.unit,
    };
  }

  public setAcademicCalendar (calendar: Calendar): void {
    this.academicCalendar = calendar;
  }

  public getAcademicCalendar (): Calendar {
    return this.academicCalendar;
  }

  public setSchoolGrade (schoolGrade: ISchoolGradeEntry[]): void {
    this.schoolGrade = schoolGrade;
  }

  public getSchoolGrade (): ISchoolGradeEntry[] {
    return this.schoolGrade;
  }

  public setHistory (history: IHistoryEntry[]): void {
    this.history = history;
  }

  public getHistory (): IHistoryEntry[] {
    return this.history;
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
