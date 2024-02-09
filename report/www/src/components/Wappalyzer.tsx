import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";

import { Panel } from "./Panel";

type WappalyzerProps = { data: WappalyzerReport };

const columns = [
  { name: "name", label: "Name" },
  {
    name: "categories",
    label: "Categories",
    render: ({ categories }) =>
      categories && categories.map((cat: any) => cat.name).join(", "),
  },
  {
    name: "website",
    label: "Website",
    render: ({ website }) => (
      <a href={website} target="_blank" rel="nopoener noreferrer">
        {website}
      </a>
    ),
  },
];

export const Wappalyzer: React.FC<WappalyzerProps> = ({ data }) => {
  const tableData = [
    columns.map((col) => col.name),
    ...data.technologies.map((tech) =>
      columns.map((col) => (col.render ? col.render(tech) : tech[col.name]))
    ),
  ];
  return (
    (data && data.technologies && data.technologies.length && (
      <Panel title="Wappalyzer" info="Détection des technologies utilisées">
        <Table data={tableData} />
      </Panel>
    )) ||
    null
  );
};
