import * as chai from "chai";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import * as mocha from "mocha";
import Network from "core/Network";
import Parser from "core/Parser";
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
    it("should have an iframe with registered emails", () => {
      const tag = $home('[name="Embpage1"]');
      expect(tag).to.have.lengthOf(1);
      expect(tag.attr("src")).to.be.a("string");
    });
    it("should have an iframe with registered emails array list", () => {
      return Network.get({
        cookie, route: $home('[name="Embpage1"]').attr("src"),
      }).then((html) => cheerio.load(html))
      .then(($iframe) => {
        const tag = $iframe("[name=Grid1ContainerDataV]");
        let tableData = $iframe("[name=Grid1ContainerDataV]").val();
        expect(tag).to.have.lengthOf(1);
        expect(tableData).to.be.a("string");
        tableData = JSON.parse(tableData);
        expect(tableData).to.be.a("array");
        expect(tableData.length).to.be.above(0);
      });
    });
  });
  describe("partial grades", () => {
    let $partialGrades: any = null;
    let data: any;
    let evaluations = [];
    const grades = [];
    before((done) => {
      Network.get({
        cookie, route: Network.ROUTES.PARTIAL_GRADES,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        $partialGrades = $;
        done();
      }).catch((error) => done(error));
    });
    it("should have a JSON with grades", () => {
      const tag = $partialGrades("[name=GXState]");
      data = $partialGrades("[name=GXState]").val();
      expect(tag).to.have.lengthOf(1);
      expect(data).to.be.a("string");
      data = Parser.parseGxState(data);
      expect(data).to.have.property("Acd_alunonotasparciais_sdt");
    });

    it("the JSON should have list of disciplines with approval, grade, frequency," +
       " course ID, name, code and evaluations", () => {
      expect(data.Acd_alunonotasparciais_sdt).to.be.a("array");
      data = data.Acd_alunonotasparciais_sdt;
      for (const discipline of data) {
        expect(discipline).to.have.property("ACD_Periodoid");
        expect(discipline).to.have.property("ACD_AlunoHistoricoItemAprovada");
        expect(discipline).to.have.property("ACD_AlunoHistoricoItemMediaFinal");
        expect(discipline).to.have.property("ACD_AlunoHistoricoItemFrequencia");
        expect(discipline).to.have.property("ACD_CursoId");
        expect(discipline).to.have.property("ACD_DisciplinaNome");
        expect(discipline).to.have.property("ACD_DisciplinaSigla");
        expect(discipline).to.have.property("ACD_AlunoHistoricoItemTurmaId");
        expect(discipline).to.have.property("ACD_AlunoHistoricoItemDesistenciaData");

        expect(discipline).to.have.property("Avaliacoes");
        evaluations = evaluations.concat(discipline.Avaliacoes);
      }
    });
    it("evaluations should contain the JSON should have weight, code, title and description", () => {
      for (const evaluation of evaluations) {
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoDataPrevista).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoDataProva).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoDataPublicacao).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoPeso).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoSufixo).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoTitulo).to.be.a("string");
        expect(evaluation.ACD_PlanoEnsinoAvaliacaoDescricao).to.be.a("string");
        expect(evaluation.Notas).to.be.a("array");
        for (const grade of evaluation.Notas) {
          grades.push(grade);
        }
      }
    });
    it("grades should contain release date and score", () => {
      if (!grades.length) {
        console.warn("No grades found, maybe in your profile there is none.");
      }
      for (const grade of grades) {
        expect(grade.ACD_PlanoEnsinoAvaliacaoParcialDataLancamento).to.be.a("string");
        expect(grade.ACD_PlanoEnsinoAvaliacaoParcialNota).to.be.a("number");
      }
    });
  });
  describe("partial absenses", () => {
    let $absenses: any = null;
    let data: any;
    before((done) => {
      Network.get({
        cookie, route: Network.ROUTES.PARTIAL_ABSENSES,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        $absenses = $;
        done();
      }).catch((error) => done(error));
    });
    it("should have a JSON with absenses", () => {
      const tag = $absenses("[name=GXState]");
      data = $absenses("[name=GXState]").val();
      expect(tag).to.have.lengthOf(1);
      expect(data).to.be.a("string");
      data = Parser.parseGxState(data);
      expect(data).to.have.property("vFALTAS");
    });
    it("the JSON should have a list of enrolled disciplines with total absense, classroom ID, discipline code," +
       " course ID, discipline name, period ID, total presences and teacher ID", () => {
      expect(data.vFALTAS).to.be.a("array");
      data = data.vFALTAS;
      for (const line of data) {
        expect(line).to.have.property("TotalAusencias");
        expect(line).to.have.property("ACD_AlunoHistoricoItemTurmaId");
        expect(line).to.have.property("ACD_DisciplinaSigla");
        expect(line).to.have.property("ACD_AlunoHistoricoItemCursoId");
        expect(line).to.have.property("ACD_DisciplinaNome");
        expect(line).to.have.property("ACD_Periodoid");
        expect(line).to.have.property("TotalPresencas");
        expect(line).to.have.property("ACD_AlunoHistoricoItemProfessorId");
      }
    });
  });
  describe("schedules", () => {
    let $schedules: any = null;
    let data: any;
    before((done) => {
      Network.get({
        cookie, route: Network.ROUTES.SCHEDULE,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        $schedules = $;
        done();
      }).catch((error) => done(error));
    });
    it("should have a JSON with grades", () => {
      const tag = $schedules("[name=GXState]");
      data = $schedules("[name=GXState]").val();
      expect(tag).to.have.lengthOf(1);
      expect(data).to.be.a("string");
      data = Parser.parseGxState(data);
      expect(data).to.have.property("vALU_ALUNOHISTORICOITEM_SDT");
    });

    it("the JSON should have a list of enrolled disciplines with name, code, classroom code," +
       " and teacher name", () => {
      expect(data.vALU_ALUNOHISTORICOITEM_SDT).to.be.a("array");
      data = data.vALU_ALUNOHISTORICOITEM_SDT;
      for (const line of data) {
        expect(line).to.have.property("ACD_TurmaLetra");
        expect(line).to.have.property("Pro_PessoalNome");
        expect(line).to.have.property("ACD_DisciplinaSigla");
        expect(line).to.have.property("ACD_DisciplinaNome");
      }
    });

    it("should have a JSON with grades", () => {
      expect($schedules('[name="Grid2ContainerDataV"]')).to.have.lengthOf(1);
      expect($schedules('[name="Grid3ContainerDataV"]')).to.have.lengthOf(1);
      expect($schedules('[name="Grid4ContainerDataV"]')).to.have.lengthOf(1);
      expect($schedules('[name="Grid5ContainerDataV"]')).to.have.lengthOf(1);
      expect($schedules('[name="Grid6ContainerDataV"]')).to.have.lengthOf(1);
      expect($schedules('[name="Grid3ContainerDataV"]')).to.have.lengthOf(1);
    });
  });
  describe("history", () => {
    let $history: any = null;
    let data: any;

    before((done) => {
      Network.get({
        cookie, route: Network.ROUTES.HISTORY,
      }).then((html) => cheerio.load(html))
      .then(($) => {
        $history = $;
        done();
      }).catch((error) => done(error));
    });

    it("should have a JSON with history entries", () => {
      const tag = $history("[name=Grid1ContainerDataV]");
      data = $history("[name=Grid1ContainerDataV]").val();
      expect(tag).to.have.lengthOf(1);
      expect(data).to.be.a("string");
      data = JSON.parse(data);
      expect(data).to.be.an("array");
    });
  });
});
