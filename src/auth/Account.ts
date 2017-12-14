import * as cheerio from "cheerio";
import Network from "../core/Network";

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

  constructor (username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public isLogged () {
    return this.state === Account.STATES.LOGGED;
  }

  public isDenied () {
    return this.state === Account.STATES.DENIED;
  }

  public isIdle () {
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

  public getName () {
    let promise = Promise.resolve("");
    if (!this.cookie) {
      promise = promise.then(() => this.login());
    }
    promise = promise.then(() => {
      return Network.get({
        cookie: this.cookie,
        route: Network.ROUTES.HOME,
      }).then((html) => {
        const $ = cheerio.load(html);
        return $("#span_MPW0039vPRO_PESSOALNOME").text();
      });
    });
    return promise;
  }
}
