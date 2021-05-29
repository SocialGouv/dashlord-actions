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
  expected: {"codescanGrade": "A", codescanCount: 0}
},{
  title: "single medium alert",
  report: [{
    alerts: [{
      rule: {
        severity: "medium"
      }
    }]
  }],
  expected: {"codescanGrade": "B", codescanCount: 1}
},{
  title: "multiple medium alert",
  report: [{
    alerts: [{
      rule: {
        severity: "medium"
      }
    },{
      rule: {
        severity: "medium"
      }
    }]
  }],
  expected: {"codescanGrade": "B", codescanCount: 2}
},{
  title: "single error alert",
  report: [{
    alerts: [{
      rule: {
        severity: "error"
      }
    }]
  }],
  expected: {"codescanGrade": "F", codescanCount: 1}
}]

describe("codescan", () => {
  tests.forEach(t => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, (() => {
      expect(summary(t.report)).toEqual(t.expected);
    }))
  })
})