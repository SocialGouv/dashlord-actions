import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { Panel } from "./Panel";
import { GradeBadge } from "./GradeBadge";
import { fr } from "@codegouvfr/react-dsfr";

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
      ? "info"
      : severity === "2"
      ? "warning"
      : severity === "3"
      ? "error"
      : "info";
  return (
    <Badge className="w-100" severity={variant}>
      {row.riskdesc}
    </Badge>
  );
};

type OwaspProps = { data: ZapReport; url: string };

const columns = [
  {
    name: "risk",
    label: "Risk/Confidence",
    render: (alert) => <OwaspBadge {...alert} />,
  },
  { name: "name", label: "Name" },
];

export const Owasp: React.FC<OwaspProps> = ({ data, url }) => {
  const alerts =
    (data && data.site && data.site.flatMap((site) => site.alerts)) || [];
  alerts.sort(orderBySeverity);
  const tableData = [
    columns.map((col) => col.name),
    ...alerts.map((alert) => {
      return columns.map((col) =>
        col.render ? col.render(alert) : alert[col.name]
      );
    }),
  ];
  return (
    (alerts.length && (
      <Panel
        isExternal
        title="Scan OWASP"
        url={url}
        urlText="Rapport détaillé"
        info="Scan passif de vulnérabiliés ZAP OWASP baseline"
      >
        <Table data={tableData} />
      </Panel>
    )) ||
    null
  );
};
