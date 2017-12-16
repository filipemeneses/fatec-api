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
  const studentDisciplines = [];
  let accountDisciplines = [];
  let getNameDelay = 0;

  describe("account", () => {
    it("should login", () => {
      return account.login().then(() => {
        expect(account.isLogged()).equal(true);
        expect(account.cookie.length > 0).equal(true);
      });
    });
    it("should get name", () => {
      getNameDelay = +new Date();
      return account.getName().then((name) => {
        getNameDelay = +new Date() - getNameDelay;
        expect(name).equal(process.env.NAME);
      });
    });
    it("should get cached name", () => {
      let cachedDelay = +new Date();
      return account.getName().then((name) => {
        cachedDelay = +new Date() - cachedDelay;
        expect(getNameDelay * 0.1 > cachedDelay).equal(true);
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

            studentDisciplines.push(partialGrade.discipline);

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
    it("should have enrolled disciplines", () => {
      return account.getEnrolledDisciplines().then((disciplines) => {
        accountDisciplines = disciplines;
        if (disciplines.length) {
          for (const discipline of disciplines) {
            expect(discipline.getAbsenses()).to.be.a("number");
            expect(discipline.getName()).to.be.a("string");
            expect(discipline.getCode()).to.be.a("string");
            expect(discipline.getClassroomId()).to.be.a("number");
            expect(discipline.getClassroomCode()).to.be.a("string");
            expect(discipline.getQuitDate()).to.be.a("date");
            expect(discipline.getPeriodId()).to.be.a("number");
            expect(discipline.getCourseId()).to.be.a("number");
            expect(discipline.getPresences()).to.be.a("number");
            expect(discipline.getTeacherId()).to.be.a("number");
            expect(discipline.getTeacherName()).to.be.a("string");
          }
        }
      });
    });
    it("should have schedules", () => {
      return account.getSchedules().then((days) => {
        expect(days).to.be.an("array");
        expect(days).to.be.lengthOf(6);
        for (const day of days) {
          expect(day).to.have.property("periods");
          expect(day).to.have.property("weekday");
          expect(day.periods).to.be.an("array");
          expect(day.weekday).to.be.a("number");
          for (const period of day.periods) {
            expect(period).to.have.property("startAt");
            expect(period).to.have.property("endAt");
            expect(period).to.have.property("discipline");
            expect(period).to.have.property("classroomCode");
            expect(period.startAt).to.be.a("date");
            expect(period.endAt).to.be.a("date");
            expect(period.discipline).to.be.a.instanceof(Discipline);
            expect(period.classroomCode).to.be.a("string");
          }
        }
      });
    });
    it("should have history", () => {
      return account.getHistory().then((entries) => {
        if (entries.length) {
          for (const entry of entries) {
            expect(entry).to.have.property("discipline");
            expect(entry).to.have.property("period");
            expect(entry).to.have.property("grade");
            expect(entry).to.have.property("frequency");
            expect(entry).to.have.property("absenses");
            expect(entry).to.have.property("approved");
            expect(entry).to.have.property("observation");

            expect(entry.discipline).to.be.a.instanceOf(Discipline);
            expect(entry.period).to.be.a("string");
            expect(entry.grade).to.be.a("number");
            expect(entry.frequency).to.be.a("number");
            expect(entry.absenses).to.be.a("number");
            expect(entry.approved).to.be.a("boolean");
            expect(entry.observation).to.be.a("string");
          }
        }
      });
    });
  });
  describe("student", () => {
    it("should get name", () => {
      const name = account.student.getName();
      expect(name).equal(process.env.NAME);
    });

    it("should get registeredEmails", () => {
      const registeredEmails = account.student.getRegisteredEmails();
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
    it("should get it partial grades", () => {
      const partialGrades = account.student.getPartialGrades();
      if (partialGrades.length) {
        for (const partialGrade of partialGrades) {
          expect(partialGrade).to.have.property("approved");
          expect(partialGrade).to.have.property("discipline");
          expect(partialGrade).to.have.property("evaluations");
          expect(partialGrade).to.have.property("finalScore");
          expect(partialGrade).to.have.property("frequency");

          expect(partialGrade.approved).to.be.a("boolean");
          expect(partialGrade.discipline).to.be.an.instanceof(Discipline);

          studentDisciplines.push(partialGrade.discipline);

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
    it("should have enrolled disciplines", () => {
      const enrolledDisciplines = account.student.getEnrolledDisciplines();
      expect(studentDisciplines.length > 0).to.equal(true);
      expect(enrolledDisciplines.length === studentDisciplines.length);
      enrolledDisciplines.forEach((discipline) => {
        if (accountDisciplines.length) {
          expect(accountDisciplines.filter((_discipline) => {
            return _discipline.getPresences() === discipline.getPresences() &&
                   _discipline.getAbsenses() === discipline.getAbsenses() &&
                   +_discipline.getQuitDate() === +discipline.getQuitDate() &&
                   _discipline.getCode() === discipline.getCode();
          }).length === 1);
        }
      });
      if (enrolledDisciplines.length) {
        for (const discipline of enrolledDisciplines) {
          expect(discipline.getAbsenses()).to.be.a("number");
          expect(discipline.getName()).to.be.a("string");
          expect(discipline.getCode()).to.be.a("string");
          expect(discipline.getClassroomId()).to.be.a("number");
          expect(discipline.getClassroomCode()).to.be.a("string");
          expect(discipline.getQuitDate()).to.be.a("date");
          expect(discipline.getPeriodId()).to.be.a("number");
          expect(discipline.getCourseId()).to.be.a("number");
          expect(discipline.getPresences()).to.be.a("number");
          expect(discipline.getTeacherId()).to.be.a("number");
          expect(discipline.getTeacherName()).to.be.a("string");
        }
      }
    });

    it("should have schedules", () => {
      const schedules = account.student.getSchedules();
      expect(schedules).to.be.an("array");
      expect(schedules).to.be.lengthOf(6);
      for (const day of schedules) {
        expect(day).to.have.property("periods");
        expect(day).to.have.property("weekday");
        expect(day.periods).to.be.an("array");
        expect(day.weekday).to.be.a("number");
        for (const period of day.periods) {
          expect(period).to.have.property("startAt");
          expect(period).to.have.property("endAt");
          expect(period).to.have.property("discipline");
          expect(period).to.have.property("classroomCode");
          expect(period.startAt).to.be.a("date");
          expect(period.endAt).to.be.a("date");
          expect(period.discipline).to.be.a.instanceof(Discipline);
          expect(period.classroomCode).to.be.a("string");
        }
      }
    });

    it("should have history", () => {
      const history = account.student.getHistory();
      if (history.length) {
        for (const entry of history) {
          expect(entry).to.have.property("discipline");
          expect(entry).to.have.property("period");
          expect(entry).to.have.property("grade");
          expect(entry).to.have.property("frequency");
          expect(entry).to.have.property("absenses");
          expect(entry).to.have.property("approved");
          expect(entry).to.have.property("observation");

          expect(entry.discipline).to.be.a.instanceOf(Discipline);
          expect(entry.period).to.be.a("string");
          expect(entry.grade).to.be.a("number");
          expect(entry.frequency).to.be.a("number");
          expect(entry.absenses).to.be.a("number");
          expect(entry.approved).to.be.a("boolean");
          expect(entry.observation).to.be.a("string");
        }
      }
    });
  });
});
