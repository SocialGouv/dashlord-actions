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
      grade: "B",
      open_ports: [
        {
          service: {
            vulnerabilities: [],
          },
        },
      ],
    },
    expected: {
      nmapGrade: "B",
      nmapOpenPortsCount: 1,
      nmapOpenPortsGrade: "A",
    },
  },
  {
    title: "3 open ports",
    report: {
      grade: "F",
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
        {
          service: {
            vulnerabilities: [
              {
                is_exploit: false,
              },
            ],
          },
        },
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
      nmapGrade: "F",
      nmapOpenPortsCount: 3,
      nmapOpenPortsGrade: "F",
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
