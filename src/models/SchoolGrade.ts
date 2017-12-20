import Discipline from "models/Discipline";

interface ISemester {
  number: number;
  disciplines: Discipline[];
}

export default class SchoolGrade {

  private semesters: ISemester[];

  constructor (semesters: ISemester[]) {
    this.semesters = semesters;
  }

  public setSemesters (semesters: ISemester[]): void {
    this.semesters = semesters;
  }

  public getSemesters (): ISemester[] {
    return this.semesters;
  }

}
