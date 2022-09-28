import * as React from "react";

import { Grade } from "./Grade";
import { Panel } from "./Panel";

type EcoIndexProps = { data: EcoIndexReport };

export const EcoIndex: React.FC<EcoIndexProps> = ({ data }) => {
  const ges = data.find((r) => r.label === "GES");
  const h2o = data.find((r) => r.label === "Eau");
  return (
    (data && ges && h2o && (
      <Panel
        title="Eco-index"
        info="Score eco-index d'après green-it"
        url="https://www.ecoindex.fr/quest-ce-que-ecoindex"
        urlText="Qu'est-ce que l'éco index ?"
        isExternal={true}
      >
        <Grade
          grade={data.find((r) => r.label === "Note").value.toString()}
        ></Grade>
        &nbsp;
        <Grade
          grade={data.find((r) => r.label === "Note").value.toString()}
          label={
            data.find((r) => r.label === "EcoIndex").value.toString() + "/100"
          }
        ></Grade>
        <br />
        <br />
        <h5>
          GES: {ges.value} {ges.unit} par visite
        </h5>
        {ges.comment}
        <br />
        <br />
        <h5>
          Eau : {h2o.value} {h2o.unit} par visite
        </h5>{" "}
        {h2o.comment}
      </Panel>
    )) ||
    null
  );
};
