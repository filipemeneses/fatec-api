import * as cheerio from "cheerio";
import * as request from "request-promise-native";

export default class Network {

  public static readonly DOMAIN: string = "https://siga.cps.sp.gov.br";
  public static readonly ROUTES = {
    HOME: "/aluno/home.aspx",
    LOGIN: "/aluno/login.aspx",
  };
  public static readonly STATUS = {
    REDIRECT: 303,
  };

  public static getCookieFromResponse (response: any): string {
    return response.hasOwnProperty("headers") ? response.headers["set-cookie"].join(";") : "";
  }

  public static scrap ({ cookie, route, scrapper }: {cookie: string, route: string, scrapper: (object) => void}): any {
    let promise = Promise.resolve("");
    if (!cookie) {
      promise = promise.then(() => {
        throw new Error("Missing cookie, try logging in");
      });
    }
    return promise.then(() => {
      return Network.get({ cookie, route }).then((html) => scrapper(cheerio.load(html)));
    });
  }

  public static post ({ form, route }): Promise<any> {
    const options = Network.buildOptions({
      form,
      method: "POST",
      route,
    });
    return request(options);
  }

  public static get ({ cookie, route }: { cookie?: string, route: string}): Promise<any> {
    let headers = {};
    if (cookie) {
      headers = {
        Cookie: cookie,
      };
    }
    const options = Network.buildOptions({
      headers,
      method: "GET",
      route,
    });
    return request(options);
  }

  private static buildOptions ({ method, route, headers, form }:
    {method: string, route: string, headers?: object, form?: object}): object {
    headers = headers || {};
    headers["User-Agent"] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 " +
                            "(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";
    headers["Origin"] = this.DOMAIN;
    if (method.toLowerCase() === "post") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const uri: string = !route.startsWith("http") ? `${this.DOMAIN}${route}` : route;

    return {
      form: Object.assign({
        GXState: '{"_EventName":"EENTER.","_EventGridId":"","_EventRowId":"",' +
        '"MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vREC_' +
        'SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"' +
        '0BDD4711481AA1585555288A38D54A0E","AJAX_SECURITY_TOKEN":"60D2197ED30' +
        'EA865BA4DDC1181C00E9DE327E1CD49D496228104BEF231E87A2D","GX_CMP_OBJS"' +
        ':{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResour' +
        'ceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModif' +
        'ied":"1"}',
      }, form),
      headers,
      method,
      params: {
        "165c97fac0d4c1ad6055e3730b7af070,,gx-no-cache": 1513131652687,
      },
      strictSSL: false,
      uri,
    };
  }

}
