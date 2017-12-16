enum DisciplineState {
  approved = "approved",
  notAttended = "not-attended",
  attending = "attending",
  dismissed = "dismissed",
  quited = "quited",
}

export default class Discipline {

  private name: string;
  private code: string;
  private period: string;
  private classroomCode: string;
  private classroomId: number;
  private quitDate: Date;
  private periodId: number;
  private courseId: number;
  private grade: number;
  private teacherName: string;
  private teacherId: number;
  private absenses: number;
  private presences: number;
  private classHours: number;
  private state: DisciplineState;

  constructor ({
    absenses,
    name,
    code,
    classroomCode,
    classroomId,
    classHours,
    grade,
    quitDate,
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
    grade?: number,
    quitDate?: Date,
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
    this.classroomId = classroomId;
    this.classroomCode = classroomCode;
    this.grade = grade;
    this.quitDate = quitDate || new Date(0);
    this.periodId = periodId;
    this.courseId = courseId;
    this.presences = presences;
    this.state = state;
    this.teacherId = teacherId;
    this.teacherName = teacherName;
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

  public getState (state): DisciplineState {
    return this.state;
  }

  public setclassroomCode (classroomCode: string): void {
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
