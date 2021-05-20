import * as React from "react";

import { Table, Badge } from "react-bootstrap";

import { Panel } from "./Panel";

const orderBySeverity = (a: CodescanAlert, b: CodescanAlert) => {
  // high criticity first
  const severities = new Map();
  severities.set("error", 1);
  severities.set("warning", 0);
  return (
    severities.get(b.rule.severity) -
    severities.get(a.rule.severity)
  );
};

const CodescanBadge = (alert: CodescanAlert) => {
  const severity = alert.rule.severity;
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

export const Codescan: React.FC<CodescanProps> = ({ data, url }) => {
  const alerts =
    data && data.alerts.length > 0
      ? data.alerts
      : [];
  alerts.sort(orderBySeverity);
  return (
    (alerts.length > 0 && (
      <Panel
        title="Codescan"
        url={data.url + '/security/code-scanning'}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 100 }} className="text-center">
                Sévérité
              </th>
              <th>Règle</th>
              <th>Descritpion</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, i: number) => {
              return (
                <tr key={alert.rule.name + i}>
                  <td className="text-center">
                    <CodescanBadge {...alert} />
                  </td>
                  <td>{alert.rule.name}</td>
                  <td>
                    <a target="_blank" href={alert.html_url} rel="noopener noreferrer">
                      {alert.rule.description}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Panel>
    )) ||
    null
  );
};
