import * as chai from "chai";
import * as mocha from "mocha";
import Discipline from "models/Discipline";
import Evaluation from "models/Evaluation";

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
    it("should get it partial grades", () => {
      return account.getPartialGrades().then((partialGrades) => {
        if (partialGrades.length) {
          for (const partialGrade of partialGrades) {
            expect(partialGrade).to.have.property("approved");
            expect(partialGrade).to.have.property("discipline");
            expect(partialGrade).to.have.property("evaluations");
            expect(partialGrade).to.have.property("finalScore");
            expect(partialGrade).to.have.property("frequency");

            expect(partialGrade.approved).to.be.a("boolean");
            expect(partialGrade.discipline).to.be.an.instanceof(Discipline);
            expect(partialGrade.evaluations).to.be.an("array");
            expect(partialGrade.finalScore).to.be.a("number");
            expect(partialGrade.frequency).to.be.a("number");
            for (const evaluation of partialGrade.evaluations) {
              expect(evaluation).to.be.an.instanceof(Evaluation);
              expect(evaluation.applyDates).to.be.an("object");
              expect(evaluation.code).to.be.a("string");
              expect(evaluation.description).to.be.a("string");
              expect(evaluation.grades).to.be.an("array");
              expect(evaluation.title).to.be.a("string");
              expect(evaluation.weight).to.be.a("number");
              expect(evaluation.applyDates).to.have.property("predicted");
              expect(evaluation.applyDates).to.have.property("applied");
              expect(evaluation.applyDates).to.have.property("published");
              expect(evaluation.applyDates.predicted).to.be.an.instanceof(Date);
              expect(evaluation.applyDates.applied).to.be.an.instanceof(Date);
              expect(evaluation.applyDates.published).to.be.an.instanceof(Date);

              for (const grade of evaluation.grades) {
                expect(grade).to.have.property("date");
                expect(grade).to.have.property("score");
                expect(grade.date).to.be.an.instanceof(Date);
                expect(grade.score).to.be.a("number");
              }
            }
          }
        }
      });
    });
  });
});
