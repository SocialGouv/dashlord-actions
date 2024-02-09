import * as React from "react";

import Table from "@codegouvfr/react-dsfr/Table";

import { Panel } from "./Panel";

type Report404Props = { data: Wget404Report };

export const Report404: React.FC<Report404Props> = ({ data }) => {
  const tableData = data && [
    ["destination"],
    ...data.map((url2) => [url2.link]),
  ];
  return (
    (data && data.length && (
      <Panel title="Erreurs 404" info="Pages introuvables">
        <Table data={tableData} />
      </Panel>
    )) ||
    null
  );
};
