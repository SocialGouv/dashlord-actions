const summary = require("./trivy");

const tests = [
  {
    title: "invalid report",
    report: null,
    expected: undefined,
  },
  {
    title: "critical report",
    report: [
      {
        Target:
          "ghcr.io/socialgouv/sample-next-app/app:latest (alpine 3.11.12)",
        Vulnerabilities: [
          {
            VulnerabilityID: "CVE-2018-17360",
            PkgName: "binutils",
            PrimaryURL: "https://avd.aquasec.com/nvd/cve-2018-17360",
            Title:
              "binutils: heap-based buffer over-read in bfd_getl32 in libbfd.c",
            Severity: "MEDIUM",
          },
        ],
      },
      {
        Target:
          "ghcr.io/socialgouv/sample-next-app/hasura:latest (debian 10.9)",
        Vulnerabilities: [
          {
            VulnerabilityID: "CVE-2019-18276",
            PkgName: "bash",
            PrimaryURL: "https://avd.aquasec.com/nvd/cve-2019-18276",
            Title:
              "bash: when effective UID is not equal to its real UID the saved UID is not dropped",
            Severity: "HIGH",
          },
          {
            VulnerabilityID: "CVE-2018-12699",
            PkgName: "binutils",
            PrimaryURL: "https://avd.aquasec.com/nvd/cve-2018-12699",
            Title:
              "binutils: heap-based buffer overflow in finish_stab in stabs.c",
            Severity: "CRITICAL",
          },
        ],
      },
    ],
    expected: {
      trivy: 3,
      trivyGrade: "F",
    },
  },
  {
    title: "medium report",
    report: [
      {
        Target:
          "ghcr.io/socialgouv/sample-next-app/app:latest (alpine 3.11.12)",
        Vulnerabilities: [
          {
            VulnerabilityID: "CVE-2018-17360",
            PkgName: "binutils",
            PrimaryURL: "https://avd.aquasec.com/nvd/cve-2018-17360",
            Title:
              "binutils: heap-based buffer over-read in bfd_getl32 in libbfd.c",
            Severity: "MEDIUM",
          },
        ],
      },
      {
        Target:
          "ghcr.io/socialgouv/sample-next-app/hasura:latest (debian 10.9)",
      },
    ],
    expected: {
      trivy: 1,
      trivyGrade: "C",
    },
  },
];

describe("trivy", () => {
  tests.forEach((t) => {
    test(`${t.title} should return ${JSON.stringify(t.expected)}`, () => {
      //@ts-expect-error
      expect(summary(t.report)).toEqual(t.expected);
    });
  });
});
