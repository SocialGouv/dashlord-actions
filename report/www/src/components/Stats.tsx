import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";

type StatsProps = { data: StatsReport; url: string };

export const Stats: React.FC<StatsProps> = ({ data, url }) =>
  (data && (
    <Panel
      title="Page /stats"
      url={`${url}/${data.uri}`}
      isExternal
      info={<span>Détection de la page /{data.uri}</span>}
    >
      <h3>
        Scan Summary : <Grade small grade={data.grade} />
      </h3>
      {data.grade === "A" && (
        <div>
          Page bien détéctée :{" "}
          <a href={`${url}/${data.uri}`}>
            {url}/{data.uri}
          </a>
        </div>
      )}
    </Panel>
  )) ||
  null;
