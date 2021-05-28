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
        apdex: 42
      }
    },
    expected: {
      apdex: 42,
      uptime: 1,
      uptimeGrade: "A"
    },
  },
  {
    title: "sample report 2",
    report: {
      uptime: 0.9,
      metrics:{
        apdex: 42
      }
    },
    expected: {
      apdex: 42,
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
