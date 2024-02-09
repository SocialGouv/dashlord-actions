import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";

import Badge from "@codegouvfr/react-dsfr/Badge";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { GradeBadge } from "./GradeBadge";
import { fr } from "@codegouvfr/react-dsfr";

const orderBySeverity = (a: CodescanAlert, b: CodescanAlert) => {
  // high criticity first
  const severities = new Map();
  severities.set("error", 1);
  severities.set("warning", 0);
  return severities.get(b.rule.severity) - severities.get(a.rule.severity);
};

const CodescanBadge = (alert: CodescanAlert) => {
  const { severity } = alert.rule;
  const variant =
    severity === "warning"
      ? "warning"
      : severity === "error"
      ? "error"
      : "info";
  return (
    <Badge className="w-100" severity={variant}>
      {severity}
    </Badge>
  );
};

type CodescanProps = { data: CodescanRepository; url: string };

const columns = [
  {
    name: "severity",
    label: "Sévérité",
    render: (alert) => <CodescanBadge {...alert} />,
  },
  {
    name: "rule",
    label: "Règle",
    render: (alert) => alert.rule.name,
  },
  {
    name: "description",
    label: "Description",
    render: (alert) => (
      <a target="_blank" href={alert.html_url} rel="noopener noreferrer">
        {alert.rule.description}
      </a>
    ),
  },
];

export const Codescan: React.FC<CodescanProps> = ({ data, url }) => {
  const alerts = data && data.alerts.length > 0 ? data.alerts : [];
  alerts.sort(orderBySeverity);

  const tableData = [
    columns.map((col) => col.name),
    ...alerts
      .filter(
        (alert, i, all) =>
          !all.slice(i + 1).find((a) => a.rule.id === alert.rule.id)
      )
      .map((alert) => {
        return columns.map((col) => col.render(alert));
      }),
  ];
  return (
    (alerts.length > 0 && (
      <Panel
        title={`CodeScan ${data.url.replace(/^https?:\/\/[^/]+\/(.*)/, "$1")}`}
        url={`${data.url}/security/code-scanning`}
        urlText="Alertes CodeQL"
        isExternal
        info={
          <span>
            Scan statique du code du dépôt Github{" "}
            {data.url.replace(/^https?:\/\/[^/]+\/(.*)/, "$1")}
          </span>
        }
      >
        <div className={fr.cx("fr-text--bold")}>
          Scan Summary : <GradeBadge label={data.grade} />
        </div>
        <Table data={tableData} />
      </Panel>
    )) ||
    null
  );
};
