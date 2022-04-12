import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { Alert } from "@dataesr/react-dsfr";

type StatsProps = { data: PageReport; url: string };

export const Stats: React.FC<StatsProps> = ({ data, url }) =>
  (data && (
    <Panel
      title="Page /stats"
      info="Cette page permet de publier vos mesures d'impact"
    >
      {(data.grade === "A" && (
        <Alert
          type="success"
          description={
            <>
              Page bien détéctée :{" "}
              <a href={`${url}/${data.uri}`}>
                {url}/{data.uri}
              </a>
            </>
          }
        />
      )) || (
          <Alert
            type="error"
            title=""
            description="La page /stats n'a pas été détectée !"
          />
        )}
    </Panel>
  )) ||
  null;
