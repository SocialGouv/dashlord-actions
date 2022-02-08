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

type TrivyProps = { data: TrivyReport };

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

export const Trivy: React.FC<TrivyProps> = ({ data }) => {
  return (
    <React.Fragment>
      {(data.length &&
        data.map(
          (image) =>
            image &&
            ((
              <Panel
                key={image.ArtifactName}
                isExternal
                title={`Image docker ${image.ArtifactName}`}
                info="Scan de vulnérabilités Trivy"
              >
                <h6>{image.Target}</h6>
                {image.Vulnerabilities && image.Vulnerabilities.length ? (
                  <Table
                    columns={columns}
                    data={image.Vulnerabilities?.sort(orderBySeverity).filter(
                      filterByKey("VulnerabilityID")
                    )}
                    rowKey="VulnerabilityID"
                  />
                ) : (
                  <Alert
                    type="success"
                    title=""
                    description="Aucune vulnérabilité détectée par Trivy"
                  />
                )}
              </Panel>
            ) ||
              null)
        )) ||
        null}
    </React.Fragment>
  );
};
