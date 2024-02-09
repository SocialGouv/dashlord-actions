import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { BadgeUpdatedAt } from "./BadgeUpdatedAt";
import { Panel } from "./Panel";

const NucleiBadge = (row: NucleiReportEntry) => {
  const severity = (row.info && row.info.severity) || "critical";
  const variant =
    severity === "critical"
      ? "error"
      : severity === "high"
      ? "error"
      : severity === "medium"
      ? "warning"
      : severity === "low"
      ? "info"
      : "success";
  return (
    <Badge className="w-100" severity={variant}>
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
    render: (data: NucleiReportEntry) => (
      <a href={data["template-url"]} target="_blank" rel="noopener noreferrer">
        {data["matcher-name"] || data["template-id"]}
      </a>
    ),
  },
];

export const Nuclei: React.FC<NucleiProps> = ({ data }) => {
  const rows = data;
  rows.sort(nucleiOrder);
  const tableData = [
    columns.map((col) => col.label),
    ...rows.map((row) => columns.map((col) => col.render(row))),
  ];
  const updatedAt = data.length && data[0].timestamp;
  return (
    (rows.length && (
      <Panel
        title={
          <div>
            Nuclei
            <BadgeUpdatedAt
              date={updatedAt}
              style={{ verticalAlign: "middle", paddingLeft: 10 }}
            />
          </div>
        }
        info="Détection d'erreurs de configuration et vulnérabilités"
      >
        <Table data={tableData} />
      </Panel>
    )) ||
    null
  );
};
