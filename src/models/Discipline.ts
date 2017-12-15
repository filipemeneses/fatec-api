export default class Discipline {

  private name: string;
  private code: string;
  private period: string;
  private classRoomId: number;
  private quitDate: Date;
  private periodId: number;
  private courseId: number;
  private teacherId: number;

  constructor ({ name, code, classRoomId, quitDate, periodId, courseId, teacherId}: {
    name: string,
    code: string,
    classRoomId: number,
    quitDate: Date,
    periodId: number,
    courseId: number,
    teacherId: number,
  }) {
    this.name = name;
    this.code = code;
    this.classRoomId = classRoomId;
    this.quitDate = quitDate;
    this.periodId = periodId;
    this.courseId = courseId;
    this.teacherId = teacherId;
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
