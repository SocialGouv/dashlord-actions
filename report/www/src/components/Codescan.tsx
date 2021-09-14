import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import Badge from "./Badge";
import { Panel } from "./Panel";
import { Grade } from "./Grade";

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
      ? "danger"
      : "info";
  return (
    <Badge className="w-100" variant={variant}>
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
  return (
    (alerts.length > 0 && (
      <Panel
        title="Codescan"
        url={`${data.url}/security/code-scanning`}
        info={
          <span>
            Scan du code du dépôt Github{" "}
            <a
              style={{ color: "white" }}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.url}
            </a>
          </span>
        }
      >
        <h3>
          Scan Summary : <Grade small grade={data.grade} />
        </h3>
        <Table columns={columns} data={alerts} rowKey="rule" />
      </Panel>
    )) ||
    null
  );
};
