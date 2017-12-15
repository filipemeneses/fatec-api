import * as chai from "chai";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import * as mocha from "mocha";
import Network from "core/Network";
import {getAccount} from "./helpers.js";

const expect = chai.expect;
let account: any;
let cookie: string;
before((done) => {
  account = getAccount();
  account.login().then(() => {
    if (account.isLogged()) {
      cookie = account.cookie;
      done();
    } else {
      done(new Error("Invalid credentials or SIGA is off"));
    }
  });

});

describe("siga", () => {
  describe("login", () => {
    it("login and password attributes should remain the same", () => {
      return Network.get({
        route: Network.ROUTES.LOGIN,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        expect($("#vSIS_USUARIOID").attr("name")).equal("vSIS_USUARIOID");
        expect($("#vSIS_USUARIOSENHA").attr("name")).equal("vSIS_USUARIOSENHA");
      });
    });
  });
  describe("home", () => {
    let $home: any = null;
    before((done) => {
      Network.get({
        cookie, route: Network.ROUTES.HOME,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        $home = $;
        done();
      }).catch((error) => done(error));
    });
    it("should have summary student info: name", () => {
      const tag = $home("#span_MPW0039vPRO_PESSOALNOME");
      expect(tag).to.have.lengthOf(1);
      expect(tag.text()).to.be.a("string");
    });
    it("should have summary student info: PP", () => {
      const tag = $home("#span_MPW0039vACD_ALUNOCURSOREGISTROACADEMICOCURSO");
      expect(tag).to.have.lengthOf(1);
      expect(tag.text()).to.be.a("string");
    });
    it("should have summary student info: PR", () => {
      const tag = $home("#span_MPW0039vACD_ALUNOCURSOREGISTROACADEMICOCURSO");
      expect(tag).to.have.lengthOf(1);
      expect(tag.text()).to.be.a("string");
    });
    it("should have summary student info: profile image", () => {
      const tag = $home("#MPW0039FOTO");
      expect(tag).to.have.lengthOf(1);
      expect(tag.text()).to.be.a("string");
    });
    it("should have summary student info: RA", () => {
      const tag = $home("#span_MPW0039vACD_ALUNOCURSOREGISTROACADEMICOCURSO");
      expect(tag).to.have.lengthOf(1);
      expect(tag.text()).to.be.a("string");
    });
  });

});
