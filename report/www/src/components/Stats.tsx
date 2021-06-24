import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";

type StatsProps = { data: StatsReport; url: string };

export const Stats: React.FC<StatsProps> = ({ data, url }) => {
  return (
    (data && (
      <Panel
        title="Stats"
        url={url + "/" + data.uri}
        isExternal={true}
        info={
          <span>
            Détection de la page /{data.uri}
          </span>
        }
      >
        <h3>
          Scan Summary : <Grade small grade={data.grade} />
        </h3>
        <br />
        
      </Panel>
    )) ||
    null
  );
};
