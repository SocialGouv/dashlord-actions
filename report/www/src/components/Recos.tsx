import { warning } from "@actions/core";
import * as React from "react";

import { Panel } from "./Panel";

export const Recos = ({ recos }) => {
  const errors = recos.filter((r) => r.type === "error");
  const warnings = recos.filter((r) => r.type === "warning");
  return (
    <>
      {(errors.length && (
        <Panel title="Erreurs">
          {errors.map((reco) => {
            return <li style={{ listStyleType: "none" }}>{reco.content}</li>;
          })}
        </Panel>
      )) ||
        null}
      {(warnings.length && (
        <Panel title="Observations">
          {warnings.map((reco) => {
            return <li style={{ listStyleType: "none" }}>{reco.content}</li>;
          }) || null}
        </Panel>
      )) ||
        null}
      {recos.length === 0 && (
        <div style={{ fontSize: "10vw", textAlign: "center" }}>💪</div>
      )}
    </>
  );
};
