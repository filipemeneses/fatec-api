import * as chai from "chai";
import * as mocha from "mocha";
import {getAccount} from "./helpers.js";

const expect = chai.expect;
let account: any;

before((done) => {
  account = getAccount();
  done();
});

describe("fatec-api", () => {
  it("should login", () => {
    return account.login().then(() => {
      expect(account.isLogged()).equal(true);
      expect(account.cookie.length > 0).equal(true);
    });
  });
  it("should get name", () => {
    return account.getName().then((name) => {
      expect(name).equal(process.env.NAME);
    });
  });
});
