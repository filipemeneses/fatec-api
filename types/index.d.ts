// Type definitions for fatec-api
// Project: Fatec API
// Definitions by: Filipe Meneses filipemeneses.com.br

export enum DisciplineState {
  approved = "approved",
  notAttended = "not-attended",
  attending = "attending",
  dismissed = "dismissed",
  quited = "quited",
}

export class Discipline {
  absenses: number;
  name: string;
  code: string;
  classroomCode: string;
  classroomId: number;
  classHours: number;
  frequency: number;
  grade: number;
  quitDate: Date;
  period: string;
  periodId: number;
  presences: number;
  courseId: number;
  state: DisciplineState;
  teacherName: string;
  teacherId: number;

  isApproved(): boolean;
  isNotAttended(): boolean;
  isAttending(): boolean;
  isDismissed(): boolean;
  isQuited(): boolean;

  setFrequency(frequency: number): undefined;
  getFrequency(): number;
  setGrade(grade: number): undefined;
  getGrade(): number;
  setState(state: DisciplineState): undefined;
  getState(): DisciplineState;
  setClassroomCode(classroomCode: string): undefined;
  getClassroomCode(): string;
  setTeacherName(teacherName: string): undefined;
  getTeacherName(): string;
  setAbsenses(absenses: number): undefined;
  getAbsenses(): number;
  setPresences(presences: number): undefined;
  getPresences(): number;
  setName(name: string): undefined;
  getName(): string;
  setCode(code: string): undefined;
  getCode(): string;
  setPeriod(period: string): undefined;
  getPeriod(): string;
  setclassroomId(classroomId: number): undefined;
  getClassroomId(): number;
  setQuitDate(quitDate: Date): undefined;
  getQuitDate(): Date;
  setPeriodId(periodId: number): undefined;
  getPeriodId(): number;
  setCourseId(courseId: number): undefined;
  getCourseId(): number;
  setTeacherId(teacherId: number): undefined;
  getTeacherId(): number;
}

export interface IGrade {
  releaseDate: Date;
  grade: number;
}

export interface IApplyDate {
  predicted: Date;
  applied: Date;
  published: Date;
}

export class Evaluation {
  weight: number;
  code: string;
  title: string;
  description: string;
  grades: IGrade[];
  applyDates: IApplyDate;

  constructor({ applyDates, code, description, grades, title, weight }: {
    applyDates: IApplyDate,
    code: string,
    description: string,
    grades: IGrade[],
    title: string,
    weight: number,
  })

  setWeight(weight: number): undefined;
  getWeight(): number;
  setCode(code: string): undefined;
  getCode(): string;
  setTitle(title: string): undefined;
  getTitle(): string;
  setDescription(description: string): undefined;
  getDescription(): string;
  setGrades(grades: IGrade[]): undefined;
  getGrades(): IGrade[];
  setApplyDates(applydates: IApplyDate): undefined;
  getApplyDates(): IApplyDate;
}

export enum EmailIntegrations {
  fatec,
  etec,
  preferential,
  websai,
}

export interface IRegisteredEmail {
  email: string;
  integrations: EmailIntegrations[];
}

export interface IAttendance {
  absenses: number;
  presences: number;
}

export interface IPartialGrade {
  finalScore: number;
  frequency: number;
  discipline: Discipline;
  evaluations: Evaluation[];
}

export interface IProfile {
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

export interface ISemester {
  number: number;
  disciplines: Discipline[];
}

export class SchoolGrade {
  semesters: ISemester[];

  constructor(semesters: ISemester[])

  setSemesters(semesters: ISemester[]): undefined;
  getSemesters(): ISemester[];
}

export interface IPeriod {
  startAt: Date;
  endAt: Date;
  discipline: Discipline;
}

export class Schedule {
  weekday: number;
  periods: IPeriod[];

  constructor({weekday, periods}: {weekday: number, periods: IPeriod[]})

  setWeekday(weekday: number): undefined;
  getWeekday(): number;
}

export interface IEvent {
  date: Date;
  name: string;
  reason: string;
}

export interface IMonth {
  events: IEvent[];
}

export class Calendar {
  months: IMonth[];

  constructor(months: IMonth[])

  setMonths(months: IMonth[]): undefined;
  getMonths(): IMonth[];
}

export class Student {
  averageGrade: number;
  name: string;
  birthday: Date;
  code: string;
  course: string;
  cpf: string;
  email: string;
  period: string;
  progress: number;
  unit: string;
  registeredEmails: IRegisteredEmail[];
  partialGrades: IPartialGrade[];
  enrolledDisciplines: Discipline[];
  schedules: Schedule[];
  history: History;
  schoolGrade: SchoolGrade;
  academicCalendar: Calendar;

  isEnrolledAtDiscipline(discipline: Discipline): boolean;
  setProfile(profile: IProfile): undefined;
  getProfile(): IProfile;
  setAcademicCalendar(calendar: Calendar): undefined;
  getAcademicCalendar(): Calendar;
  setSchoolGrade(schoolGrade: SchoolGrade): undefined;
  getSchoolGrade(): SchoolGrade;
  setHistory(history: History): undefined;
  getHistory(): History;
  setSchedules(schedules: Schedule[]): undefined;
  getSchedules(): Schedule[];
  getEnrolledDisciplineByCode(code: string): Discipline;
  setName(name: string): undefined;
  getName(): string;
  setRegisteredEmails(registeredEmails: IRegisteredEmail[]): undefined;
  getRegisteredEmails(): IRegisteredEmail[];
  setPartialGrades(partialGrades: IPartialGrade[]): undefined;
  getPartialGrades(): IPartialGrade[];
  setEnrolledDisciplines(disciplines: Discipline[]): undefined;
  setEnrolledDiscipline(discipline: Discipline): undefined;
  getEnrolledDisciplineIndexByCode(code: string): number;
  getEnrolledDisciplines(): Discipline[];
  updateDiscipline(discipline: Discipline): undefined;
}

export class Account {
  STATES: any;
  username: string;
  password: string;
  cookie: string;
  state: number;
  student: Student;

  constructor(username: string, password: string);

  isLogged(): boolean;
  isDenied(): boolean;
  isIdle(): boolean;

  login(): Promise<any>;
  getStudent(): Promise<object>;
  getName(): Promise<string>;
  getProfile(): Promise<object>;
  getAcademicCalendar(): Promise<any>;
  getSchoolGrade(): Promise<any>;
  getHistory(): Promise<any>;
  getSchedules(): Promise<any>;
  getRegisteredEmails(): Promise<any>;
  getPartialGrades(): Promise<any>;
  getEnrolledDisciplines(): Promise<any>;
  checkCookie(): Promise<undefined>;
}
