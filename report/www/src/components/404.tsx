import * as React from "react";

import { Table } from "@dataesr/react-dsfr";

import { Panel } from "./Panel";

type Report404Props = { data: Wget404Report };

const columns = [{ name: "link", label: "URL" }];

export const Report404: React.FC<Report404Props> = ({ data }) =>
  (data && data.length && (
    <Panel title="Erreurs 404" info="Pages introuvables">
      <Table rowKey="name" columns={columns} data={data} />
    </Panel>
  )) ||
  null;
