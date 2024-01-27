import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";
import { getLastUrlSegment } from "../utils";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import { GradeBadge } from "./GradeBadge";

const orderBySeverity = (a: DependabotNode, b: DependabotNode) => {
  // high criticity first
  const severities = new Map();
  severities.set("CRITICAL", 3);
  severities.set("HIGH", 2);
  severities.set("MODERATE", 1);
  severities.set("LOW", 0);
  return (
    severities.get(b.securityVulnerability.severity) -
    severities.get(a.securityVulnerability.severity)
  );
};

const DependabotBadge = (node: DependabotNode) => {
  const { severity } = node.securityVulnerability;
  const variant =
    severity === "LOW"
      ? "info"
      : severity === "MODERATE"
      ? "warning"
      : severity === "HIGH"
      ? "error"
      : severity === "CRITICAL"
      ? "error"
      : "info";
  return (
    <Badge className="w-100" severity={variant}>
      {severity}
    </Badge>
  );
};

type DependabotProps = { data: DependabotRepository; url: string };

const columns = [
  {
    name: "severity",
    label: "Sévérité",
    render: (node) => <DependabotBadge {...node} />,
  },
  {
    name: "dependancy",
    label: "dépendance vulnérable",
    render: (node) => node.securityVulnerability.package.name,
  },
  {
    name: "vulnerabilities",
    label: "Vulnérabilités",
    render: (node) =>
      node.securityVulnerability.advisory.references.map(
        (reference, i: number) => (
          <p key={getLastUrlSegment(reference.url) + i}>
            <a target="_blank" href={reference.url} rel="noopener noreferrer">
              {getLastUrlSegment(reference.url)}
            </a>
            <br />
          </p>
        )
      ),
  },
];
export const Dependabot: React.FC<DependabotProps> = ({ data, url }) => {
  const nodes =
    data && data.vulnerabilityAlerts.totalCount > 0
      ? data.vulnerabilityAlerts.nodes.filter((node) => !node.dismissedAt)
      : [];
  nodes.sort(orderBySeverity);
  return (
    (nodes.length > 0 && (
      <Panel
        title={`Alertes Dependabot ${data.url.replace(
          /^https:\/\/github\.com\/(.*)/,
          "$1"
        )}`}
        url={`${data.url}/security/dependabot`}
        urlText="Alertes dependabot"
        isExternal={true}
        info={
          <span>
            Vulnérabilités des dépendances du dépôt Github{" "}
            {data.url.replace(/^https:\/\/github\.com\/(.*)/, "$1")}
          </span>
        }
      >
        <div className={fr.cx("fr-text--bold")}>
          Scan Summary : <GradeBadge label={data.grade} />
        </div>
        <Table data={[]} />
      </Panel>
    )) ||
    null //<Alert severity="success" title="Aucune alerte dependabot" />
  );
};
