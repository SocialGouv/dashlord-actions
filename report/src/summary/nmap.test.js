const summary = require("./nmap");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "sample report",
    report: {
      open_ports: [
        {
          service: {
            vulnerabilities: [],
          },
        },
      ],
    },
    expected: {
      nmapGrade: "A",
      nmapCount: 0
    },
  },
  {
    title: "not exploitable vuln",
    report: {
      open_ports: [
        {
          service: {
            vulnerabilities: [
              {
                is_exploit: false,
              },
            ],
          },
        },
      ],
    },
    expected: {
      nmapGrade: "B",
      nmapCount: 1
    },
  },
  {
    title: "exploitable vuln, low cvss",
    report: {
      open_ports: [
        {
          service: {
            vulnerabilities: [
              {
                is_exploit: true,
                cvss: 5,
              },
            ],
          },
        },
      ],
    },
    expected: {
      nmapGrade: "B",
      nmapCount: 1
    },
  },
  {
    title: "exploitable vuln, high cvss",
    report: {
      open_ports: [
        {
          service: {
            vulnerabilities: [
              {
                is_exploit: true,
                cvss: 8,
              },
            ],
          },
        },
      ],
    },
    expected: {
      nmapGrade: "F",
      nmapCount: 1
    },
  },
];

describe("nmap", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
