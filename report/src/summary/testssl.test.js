const summary = require("./testssl");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "invalid report 2",
    report: [{id:"some", finding:"X"}],
    expected: undefined
  },
  {
    title: "sample report",
    report: [{id:"overall_grade", finding:"X"}],
    expected: {
      testsslGrade: "X"
    },
  }
];

describe("testssl", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
