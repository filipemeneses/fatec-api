import Calendar from "models/Calendar";
import Discipline from "models/Discipline";
import Evaluation from "models/Evaluation";
import History from "models/History";
import Schedule from "models/Schedule";
import SchoolGrade from "models/SchoolGrade";

enum EmailIntegrations {
  fatec,
  etec,
  preferential,
  websai,
}

interface IRegisteredEmail {
  email: string;
  integrations?: EmailIntegrations[];
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

interface IProfile {
  averageGrade: number;
  birthday: Date;
  code: string;
  course: string;
  cpf: string;
  email: string;
  name: string;
  period: string;
  picture?: string;
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
  private picture: string;
  private progress: number;
  private unit: string;

  private registeredEmails: IRegisteredEmail[];
  private partialGrades: IPartialGrade[];
  private enrolledDisciplines: Discipline[] = [];
  private schedules: Schedule[];
  private history: History;
  private schoolGrade: SchoolGrade;
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
    this.picture = profile.picture;
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
      picture: this.picture,
      progress: this.progress,
      unit: this.unit,
    };
  }

  public setPicture (picture: string): void {
    this.picture = picture;
  }

  public getPicture (): string {
    return this.picture;
  }

  public setAcademicCalendar (calendar: Calendar): void {
    this.academicCalendar = calendar;
  }

  public getAcademicCalendar (): Calendar {
    return this.academicCalendar;
  }

  public setSchoolGrade (schoolGrade: SchoolGrade): void {
    this.schoolGrade = schoolGrade;
  }

  public getSchoolGrade (): SchoolGrade {
    return this.schoolGrade;
  }

  public setHistory (history: History): void {
    this.history = history;
  }

  public getHistory (): History {
    return this.history;
  }

  public setSchedules (schedules: Schedule[]): void {
    this.schedules = schedules;
  }

  public getSchedules (): Schedule[] {
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
