import * as React from "react";

import { Table, Badge } from "react-bootstrap";

import { Panel } from "./Panel";

const orderBySeverity = (a: ZapReportSiteAlert, b: ZapReportSiteAlert) => {
  // high criticity first
  const order = parseInt(b.riskcode) - parseInt(a.riskcode);
  if (order === 0) {
    // high confidence first
    return parseInt(b.confidence) - parseInt(a.confidence);
  }
  return order;
};

const OwaspBadge = (row: ZapReportSiteAlert) => {
  const severity = row.riskcode;
  const variant =
    severity === "0"
      ? "info"
      : severity === "1"
        ? "warning"
        : severity === "2"
          ? "danger"
          : severity === "3"
            ? "danger"
            : "info";
  return (
    <Badge className="w-100" variant={variant}>
      {row.riskdesc}
    </Badge>
  );
};

type OwaspProps = { data: ZapReport; url: string };

export const Owasp: React.FC<OwaspProps> = ({ data, url }) => {
  const alerts =
    data && data.site && data.site.flatMap((site) => site.alerts) || [];
  alerts.sort(orderBySeverity);
  return (
    (alerts.length && (
      <Panel
        title="OWASP"
        url={url}
        info="Scan de vulnérabiliés OWASP baseline"
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 100 }} className="text-center">
                risk/confidence
              </th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, i: number) => {
              return (
                <tr key={alert.name + i}>
                  <td className="text-center">
                    <OwaspBadge {...alert} />
                  </td>
                  <td>{alert.name}</td>
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
