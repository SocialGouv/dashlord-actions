import { Callout, CalloutTitle, Table } from "@dataesr/react-dsfr";
import uniqBy from "lodash.uniqby";

import Badge from "./Badge";
import { Panel } from "./Panel";

type TrivyDashboardProps = { report: DashLordReport };

const TrivyBadge = (row: TrivyVulnerability & { title: string }) => {
  const severity = row.severity || "";
  const variant =
    severity === "CRITICAL"
      ? "danger"
      : severity === "HIGH"
      ? "danger"
      : severity === "MEDIUM"
      ? "warning"
      : severity === "LOW"
      ? "info"
      : "success";
  return (
    <Badge className="w-100" variant={variant}>
      {row.title || severity}
    </Badge>
  );
};

const columns = [
  {
    name: "severity",
    label: "Séverité",
    render: (row) => <TrivyBadge {...row} title={row.score} />,
  },
  {
    name: "title",
    label: "Title",
    render: (data) => (
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        {data.title || data.id}
      </a>
    ),
  },
  {
    name: "fixable",
    label: "",
    render: (row) => (
      <div style={{ textAlign: "center" }}>
        {row.fixableVersions ? `✅ ${row.fixableVersions}` : "❌"}
      </div>
    ),
  },
];

type TrivyVulnerability = {
  image: string;
  target: string;
  severity: string;
  title: string;
  fixableVersions: string;
  id: string;
  url: string;
  score: number;
  key: string;
};

const getVulnerabilities = (report: DashLordReport): TrivyVulnerability[] => {
  const scans = report
    .filter((detail) => detail.trivy && detail.trivy.length)
    .flatMap((detail) => detail.trivy);

  const vulnerabilities: TrivyVulnerability[] = scans.flatMap(
    (scan: TrivyScanResult) =>
      scan.Results.filter(
        (result) => result.Vulnerabilities && result.Vulnerabilities.length
      ).flatMap((result) =>
        result.Vulnerabilities.map((vuln) => ({
          image: scan.ArtifactName,
          target: result.Target,
          severity: vuln.Severity,
          title: vuln.Title,
          fixableVersions: vuln.FixedVersion,
          id: vuln.VulnerabilityID,
          url: vuln.PrimaryURL,
          key: scan.ArtifactName + result.Target + vuln.Severity + vuln.Title,
          score: Math.max(
            vuln.CVSS?.nvd?.V3Score || 0,
            vuln.CVSS?.nvd?.V2Score || 0,
            vuln.CVSS?.redhat?.V3Score || 0
          ),
        }))
      )
  );

  return uniqBy(vulnerabilities, "key");
};

export const TrivyDashboard = ({ report }: TrivyDashboardProps) => {
  const vulnerabilities = getVulnerabilities(report);

  // only show criticals
  const severities = ["CRITICAL" /*, "HIGH", "MEDIUM", "LOW", "INFO"*/];
  return (
    <>
      <Callout hasInfoIcon={false} className="fr-mb-3w">
        <CalloutTitle as="h1">Trivy : analyse des images Docker</CalloutTitle>
      </Callout>
      {severities.map((severity) => {
        const images: Record<string, any[]> = vulnerabilities
          .filter((vuln) => vuln.severity === severity)
          .filter((vuln) => vuln.target !== "Node.js")
          .reduce((a, vuln) => {
            if (!a[vuln.target]) {
              a[vuln.target] = [];
            }
            a[vuln.target].push(vuln);
            return a;
          }, {});
        return Object.entries(images)
          .sort(([_, vulns1], [__, vulns2]) => vulns2.length - vulns1.length)
          .map(([image, vulns]: [string, TrivyVulnerability[]]) => {
            vulns.sort((v1, v2) => v2.score - v1.score);
            return (
              <Panel
                key={image}
                title={`${severity} (${vulns.length}) : ${image}`}
              >
                <Table
                  rowKey={(args) => args.key}
                  columns={columns}
                  data={vulns}
                />
              </Panel>
            );
          });
      })}
    </>
  );
};
