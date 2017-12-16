import * as chai from "chai";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import * as mocha from "mocha";
import Network from "core/Network";
import Discipline from "models/Discipline";
import Student from "models/Student";

const expect = chai.expect;
const student = new Student();

describe("student", () => {
  describe("setEnrolledDisciplines", () => {
    before((done) => {
      student.setEnrolledDisciplines([
        new Discipline({
          code: "TST001",
          name: "Test",
        }),
      ]);
      done();
    });
    it ("should merge enrolled disciplines", () => {
      student.setEnrolledDisciplines([
        new Discipline({
          absenses: 10,
          code: "TST001",
          presences: 50,
          teacherId: 1,
        }),
      ]);
      expect(student.getEnrolledDisciplines()).to.have.lengthOf(1);
      const discipline = student.getEnrolledDisciplines()[0];
      expect(discipline.getName()).to.equal("Test");
      expect(discipline.getCode()).to.equal("TST001");
      expect(discipline.getTeacherId()).to.equal(1);
      expect(discipline.getPresences()).to.equal(50);
      expect(discipline.getAbsenses()).to.equal(10);
    });
  });
});
