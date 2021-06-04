const summary = require("./codescan");

const tests = [{
  title: "invalid report",
  report: null,
  expected: undefined
},{
  title: "no alert",
  report: {
    grade: "A",
    totalCount: 0,
    repositories: [{
      grade: 'A',
      alerts: []
    }]},
  expected: {codescanGrade: "A", codescanCount: 0}
},{
  title: "single medium alert",
  report: {
    grade: "B",
    totalCount: 1,
    repositories: [{
    grade: 'B',
    alerts: [{
      rule: {
        severity: "medium"
      }
    }]
  }]},
  expected: {codescanGrade: "B", codescanCount: 1}
},{
  title: "multiple medium alert",
  report: {
    grade: "B",
    totalCount: 2,
    repositories: [{
      grade: "B",
    alerts: [{
      rule: {
        severity: "medium"
      }
    },{
      rule: {
        severity: "medium"
      }
    }]
  }]},
  expected: {"codescanGrade": "B", codescanCount: 2}
},{
  title: "single error alert",
  report: {
    grade: "F",
    totalCount: 1,
    repositories: [{
      grade: "F",
    alerts: [{
      rule: {
        severity: "error"
      }
    }]
  }]},
  expected: {"codescanGrade": "F", codescanCount: 1}
}]

describe("codescan", () => {
  tests.forEach(t => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, (() => {
      expect(summary(t.report)).toEqual(t.expected);
    }))
  })
})