import * as chai from "chai";
import * as dotenv from "dotenv";
import * as mocha from "mocha";
import FatecApi from "../src";
import Account from "../src/auth/Account";

const expect = chai.expect;
let account: Account;
dotenv.config();

before((done) => {
  const user = process.env.LOGIN;
  const pass = process.env.PASSWORD;
  if (!user || !pass || !process.env.NAME) {
    return done(new Error(
      "\n\tTo test, create a file named \".env\" in the root folder and add the values:\n" +
      "\tLOGIN=TEST\n" +
      "\tPASSWORD=TEST\n" +
      "\tNAME=TEST\n"
    ));
  }
  account = new FatecApi.Account(user, pass);
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
