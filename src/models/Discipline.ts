export default class Discipline {

  private name: string;
  private code: string;
  private period: string;
  private classRoomCode: string;
  private classRoomId: number;
  private quitDate: Date;
  private periodId: number;
  private courseId: number;
  private teacherName: string;
  private teacherId: number;
  private absenses: number;
  private presences: number;

  constructor ({
    absenses,
    name,
    code,
    classRoomCode,
    classRoomId,
    quitDate,
    periodId,
    presences,
    courseId,
    teacherName,
    teacherId,
  }: {
    absenses?: number,
    name: string,
    code: string,
    classRoomCode?: string,
    classRoomId?: number,
    quitDate?: Date,
    periodId?: number,
    presences?: number,
    courseId?: number,
    teacherName?: string,
    teacherId?: number,
  }) {
    this.absenses = absenses;
    this.name = name;
    this.code = code;
    this.classRoomId = classRoomId;
    this.classRoomCode = classRoomCode;
    this.quitDate = quitDate || new Date(0);
    this.periodId = periodId;
    this.courseId = courseId;
    this.presences = presences;
    this.teacherId = teacherId;
    this.teacherName = teacherName;
  }

  public setClassRoomCode (classRoomCode: string): void {
    this.classRoomCode = classRoomCode;
  }

  public getClassRoomCode (): string {
    return this.classRoomCode;
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

  public setClassRoomId (classRoomId: number): void {
    this.classRoomId = classRoomId;
  }

  public getClassRoomId (): number  {
    return this.classRoomId;
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
