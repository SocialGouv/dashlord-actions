const summary = require("./codescan");

const tests = [{
  title: "invalid report",
  report: null,
  expected: undefined
},{
  title: "no alert",
  report: [{
    alerts: []
  }],
  expected: {"codescan": "A"}
},{
  title: "single medium alert",
  report: [{
    alerts: [{
      rule: {
        severity: "medium"
      }
    }]
  }],
  expected: {"codescan": "B"}
},{
  title: "single error alert",
  report: [{
    alerts: [{
      rule: {
        severity: "error"
      }
    }]
  }],
  expected: {"codescan": "F"}
}]

describe("codescan", () => {
  tests.forEach(t => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, (() => {
      expect(summary(t.report)).toEqual(t.expected);
    }))
  })
})