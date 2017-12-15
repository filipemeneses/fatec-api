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

export default class Student {

  private name: string;
  private registeredEmails: IRegisteredEmail[];

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
}
