import Network from "core/Network";
import Student from "models/Student";

export default class Account {

  private static readonly STATES = {
    DENIED: 1,
    IDLE: 0,
    LOGGED: 2,
  };

  public username: string;
  public password: string;
  public cookie: string = "";
  public state: number = Account.STATES.IDLE;

  public student: Student = new Student();

  constructor (username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public isLogged (): boolean {
    return this.state === Account.STATES.LOGGED;
  }

  public isDenied (): boolean {
    return this.state === Account.STATES.DENIED;
  }

  public isIdle (): boolean {
    return this.state === Account.STATES.IDLE;
  }

  public login (): Promise<any> {
    return Network.post({
      form: {
        vSIS_USUARIOID: this.username,
        vSIS_USUARIOSENHA: this.password,
      },
      route: Network.ROUTES.LOGIN,
    }).then((res) => {
      // No redirect means no login
      this.state = Account.STATES.DENIED;
    }).catch((err) => {
      if (err.statusCode === Network.STATUS.REDIRECT) {
        this.state = Account.STATES.LOGGED;
        this.cookie = Network.getCookieFromResponse(err.response);
      } else {
        this.state = Account.STATES.DENIED;
      }
    });
  }

  public getRegisteredEmails (): Promise<object> {
    if (this.student.getRegisteredEmails()) {
      return Promise.resolve(this.student.getRegisteredEmails());
    }
    return Network.scrap({
      cookie: this.cookie,
      route: Network.ROUTES.HOME,
      scrapper: ($$) => {
        const iFrameSrc = $$('[name="Embpage1"]').attr("src");
        return Network.scrap({
          cookie: this.cookie,
          route: iFrameSrc,
          scrapper: ($) => {
            const emailIntegrations = ["fatec", "etec", "preferential", "websai"];
            const tableData = JSON.parse($("[name=Grid1ContainerDataV]").val());
            this.student.setRegisteredEmails(tableData.map((line) => {
              return {
                email: line[0],
                integrations: line.slice(3, line.length).reduce((integrations, isIntegrated, index) => {
                  if (isIntegrated === "1") {
                    integrations.push(emailIntegrations[index]);
                  }
                  return integrations;
                }, []),
              };
            }));
            return this.student.getRegisteredEmails();
          },
        });
      },
    });
  }

  public getName (): Promise<string> {
    if (this.student.getName()) {
      return Promise.resolve(this.student.getName());
    }
    return Network.scrap({
      cookie: this.cookie,
      route: Network.ROUTES.HOME,
      scrapper: ($) => {
        this.student.setName($("#span_MPW0039vPRO_PESSOALNOME").text());
        return this.student.getName();
      },
    });
  }
}
