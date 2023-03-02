import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import Badge from "./Badge";
import { Panel } from "./Panel";

const NucleiBadge = (row: NucleiReportEntry) => {
  const severity = (row.info && row.info.severity) || "critical";
  const variant =
    severity === "critical"
      ? "danger"
      : severity === "high"
      ? "danger"
      : severity === "medium"
      ? "warning"
      : severity === "low"
      ? "info"
      : "success";
  return (
    <Badge className="w-100" variant={variant}>
      {severity}
    </Badge>
  );
};

const nucleiSeverities = "info,low,medium,high,critical".split(",");

const nucleiOrder = (a: NucleiReportEntry, b: NucleiReportEntry) =>
  nucleiSeverities.indexOf(a.info.severity) -
  nucleiSeverities.indexOf(b.info.severity);

type NucleiProps = { data: NucleiReport };

const columns = [
  {
    name: "severity",
    label: "Séverité",
    render: (failure) => <NucleiBadge {...failure} />,
  },
  { name: "name", label: "Name", render: ({ info }) => info.name },
  {
    name: "matcher-name",
    label: "Matcher",
    render: (data) => (
      <a href={data["template-url"]} target="_blank" rel="noopener noreferrer">
        {data["matcher-name"] || data["template-id"]}
      </a>
    ),
  },
];

export const Nuclei: React.FC<NucleiProps> = ({ data }) => {
  const rows = data;
  rows.sort(nucleiOrder);
  return (
    (rows.length && (
      <Panel
        title="Nuclei"
        info="Détection d'erreurs de configuration et vulnérabilités"
      >
        <Table
          rowKey={(args) => args.templateID + args.matcher_name}
          columns={columns}
          data={rows}
        />
      </Panel>
    )) ||
    null
  );
};
