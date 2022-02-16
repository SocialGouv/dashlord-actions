import * as React from "react";

import { Alert, Table } from "@dataesr/react-dsfr";
import Badge from "./Badge";
import { Panel } from "./Panel";

const levels = "UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL".split(",");

const orderBySeverity = (a: Vulnerability, b: Vulnerability) => {
  return levels.indexOf(b.Severity) - levels.indexOf(a.Severity);
};

const TrivyBadge = (vuln: Vulnerability) => {
  const severity = vuln.Severity;
  const variant =
    severity === "LOW"
      ? "info"
      : severity === "MEDIUM"
      ? "info"
      : severity === "HIGH"
      ? "warning"
      : severity === "CRITICAL"
      ? "danger"
      : "info";
  return (
    <Badge className="w-100" variant={variant}>
      {vuln.Severity}
    </Badge>
  );
};

type TrivyProps = { data: TrivyReport; url: string };

const filterByKey = (key) => (item, idx, arr) =>
  !arr.find((v, j) => j < idx && v[key] === item[key]);

const columns = [
  {
    name: "Severity",
    label: "Sévérité",
    render: (vuln) => <TrivyBadge {...vuln} />,
  },
  {
    name: "VulnerabilityID",
    label: "Vulnerability ID",
    render: (vuln) => (
      <a target="_blank" rel="noreferrer noopener" href={vuln.PrimaryURL}>
        {vuln.VulnerabilityID}
      </a>
    ),
  },
  { name: "Title", label: "Titre" },
];

const MAX_ROWS = 10;

export const Trivy: React.FC<TrivyProps> = ({ data, url }) => {
  return (
    <>
      {(data.length &&
        data
          .filter((image) => image && image.ArtifactName)
          .map((image) => {
            const vulnsCount =
              (image.Results &&
                image.Results.length &&
                image.Results.map(
                  (r) => (r.Vulnerabilities && r.Vulnerabilities.length) || 0
                ).reduce((t, c) => t + c, 0)) ||
              0;

            return (
              (
                <Panel
                  key={image.ArtifactName}
                  isExternal
                  title={`Image docker ${image.ArtifactName} (${vulnsCount})`}
                  info="Scan de vulnérabilités Trivy"
                  url={url}
                  urlText="Rapport détaillé"
                >
                  <h5>{image.Target}</h5>
                  {vulnsCount ? (
                    image.Results.map(
                      (result) =>
                        result.Vulnerabilities &&
                        result.Vulnerabilities.length && (
                          <div key={result.Target}>
                            <h6>
                              {result.Target} ({result.Type})
                            </h6>
                            {vulnsCount > MAX_ROWS && (
                              <Alert
                                type="error"
                                title=""
                                description={`Plus de ${MAX_ROWS} vulnérabilités détectées, vérifiez le rapport Trivy`}
                              />
                            )}
                            <Table
                              columns={columns}
                              data={result.Vulnerabilities?.sort(
                                orderBySeverity
                              )
                                .filter(filterByKey("VulnerabilityID"))
                                .slice(0, MAX_ROWS)}
                              rowKey="VulnerabilityID"
                            />
                            <br />
                            <br />
                            <hr />
                          </div>
                        )
                    )
                  ) : (
                    <Alert
                      type="success"
                      title=""
                      description="Aucune vulnérabilité détectée par Trivy"
                    />
                  )}
                </Panel>
              ) || null
            );
          })) ||
        null}
    </>
  );
};
