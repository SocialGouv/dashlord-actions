import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

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

export const Wappalyzer: React.FC<WappalyzerProps> = ({ data }) =>
  (data && data.technologies && data.technologies.length && (
    <Panel title="Wappalyzer" info="Détection des technologies">
      <Table
        rowKey="name"
        columns={columns}
        data={data.technologies}
      />
    </Panel>
  )) ||
  null;
