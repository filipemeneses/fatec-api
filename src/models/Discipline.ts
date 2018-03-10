enum DisciplineState {
  approved = "approved",
  notAttended = "not-attended",
  attending = "attending",
  dismissed = "dismissed",
  quited = "quited",
}

export default class Discipline {

  private absenses: number;
  private name: string;
  private code: string;
  private classroomCode: string;
  private classroomId: number;
  private classHours: number;
  private frequency: number;
  private grade: number;
  private quitDate: Date;
  private period: string;
  private periodId: number;
  private presences: number;
  private courseId: number;
  private state: DisciplineState;
  private teacherName: string;
  private teacherId: number;

  constructor ({
    absenses,
    name,
    code,
    classroomCode,
    classroomId,
    classHours,
    frequency,
    grade,
    quitDate,
    period,
    periodId,
    presences,
    courseId,
    state,
    teacherName,
    teacherId,
  }: {
    absenses?: number,
    name?: string,
    code: string,
    classroomCode?: string,
    classroomId?: number,
    classHours?: number,
    frequency?: number,
    grade?: number,
    quitDate?: Date,
    period?: string,
    periodId?: number,
    presences?: number,
    courseId?: number,
    state?: DisciplineState,
    teacherName?: string,
    teacherId?: number,
  }) {
    this.absenses = absenses;
    this.name = name;
    this.code = code;
    this.classroomCode = classroomCode;
    this.classroomId = classroomId;
    this.classHours = classHours;
    this.frequency = frequency;
    this.grade = grade;
    this.quitDate = quitDate;
    this.period = period;
    this.periodId = periodId;
    this.presences = presences;
    this.courseId = courseId;
    this.state = state;
    this.teacherName = teacherName;
    this.teacherId = teacherId;
  }

  public isApproved (): boolean {
    return this.state === "approved";
  }

  public isNotAttended (): boolean {
    return this.state === "not-attended";
  }

  public isAttending (): boolean {
    return this.state === "attending";
  }

  public isDismissed (): boolean {
    return this.state === "dismissed";
  }

  public isQuited (): boolean {
    return this.state === "quited";
  }

  public setFrequency (frequency: number): void {
    this.frequency = frequency;
  }

  public getFrequency (): number {
    return this.frequency;
  }

  public setGrade (grade: number): void {
    this.grade = grade;
  }

  public getGrade (): number {
    return this.grade;
  }

  public setState (state: DisciplineState): void {
    this.state = state;
  }

  public getState (): DisciplineState {
    return this.state;
  }

  public setClassroomCode (classroomCode: string): void {
    this.classroomCode = classroomCode;
  }

  public getClassroomCode (): string {
    return this.classroomCode;
  }

  public setTeacherName (teacherName: string): void {
    this.teacherName = teacherName;
  }

  public getTeacherName (): string {
    return this.teacherName;
  }

  public setAbsenses (absenses: number): void {
    this.absenses = absenses;
  }

  public getAbsenses (): number {
    return this.absenses;
  }

  public setPresences (presences: number): void {
    this.presences = presences;
  }

  public getPresences (): number {
    return this.presences;
  }

  public setName (name: string): void {
    this.name = name;
  }

  public getName (): string {
    return this.name;
  }

  public setCode (code: string): void {
    this.code = code;
  }

  public getCode (): string {
    return this.code;
  }

  public setPeriod (period: string): void {
    this.period = period;
  }

  public getPeriod (): string {
    return this.period;
  }

  public setclassroomId (classroomId: number): void {
    this.classroomId = classroomId;
  }

  public getClassroomId (): number  {
    return this.classroomId;
  }

  public setQuitDate (quitDate: Date): void {
    this.quitDate = quitDate;
  }

  public getQuitDate (): Date  {
    return this.quitDate;
  }

  public setPeriodId (periodId: number): void {
    this.periodId = periodId;
  }

  public getPeriodId (): number  {
    return this.periodId;
  }

  public setCourseId (courseId: number): void {
    this.courseId = courseId;
  }

  public getCourseId (): number  {
    return this.courseId;
  }

  public setTeacherId (teacherId: number): void {
    this.teacherId = teacherId;
  }

  public getTeacherId (): number  {
    return this.teacherId;
  }

}
