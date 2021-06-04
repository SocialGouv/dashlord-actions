const summary = require("./updownio");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "sample report",
    report: {
      uptime: 1,
      metrics:{
        apdex: 1
      },
      apdexGrade: 'A',
      uptimeGrade: 'A'
    },
    expected: {
      apdex: 1,
      apdexGrade: 'A',
      uptime: 1,
      uptimeGrade: "A"
    },
  },
  {
    title: "sample report 2",
    report: {
      uptime: 0.9,
      metrics:{
        apdex: 0.8
      },
      apdexGrade: 'B',
      uptimeGrade: 'F'
    },
    expected: {
      apdex: 0.8,
      apdexGrade: 'B',
      uptime: 0.9,
      uptimeGrade: "F"
    },
  },

];

describe("updownio", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
