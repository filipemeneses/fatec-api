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
  describe("account", () => {
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
    it("should get registeredEmails", () => {
      return account.getRegisteredEmails().then((registeredEmails) => {
        expect(registeredEmails.length > 0).to.equal(true);
        expect(registeredEmails[0]).to.have.property("email");
        expect(registeredEmails[0]).to.have.property("integrations");
        const emailIntegrations = ["fatec", "etec", "preferential", "websai"];
        for (const email of registeredEmails) {
          if (email.integrations.length) {
            for (const integration of email.integrations) {
              expect(emailIntegrations).to.contains(integration);
            }
          }
        }
      });
    });
  });
});
