import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import { Panel } from "./Panel";

type WappalyzerProps = { data: any };


const columns = [
  { name: "link", label: "URL" }
];

export const Report404: React.FC<WappalyzerProps> = ({ data }) =>
  (data && data.length && (
    <Panel title="Erreurs 404" info="Pages introuvables">
      <Table
        rowKey="name"
        columns={columns}
        data={data}
      />
    </Panel>
  )) ||
  null;
