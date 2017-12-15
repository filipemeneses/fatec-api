import Discipline from 'models/Discipline';
import Evaluation from 'models/Evaluation';

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

interface IPartialGrade {
  approved: boolean;
  finalScore: number;
  frequency: number;
  discipline: Discipline;
  evaluations: Evaluation[];
}

export default class Student {

  private name: string;
  private registeredEmails: IRegisteredEmail[];
  private partialGrades: IPartialGrade[];

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

}
