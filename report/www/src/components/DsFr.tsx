import * as React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";

import { Panel } from "./Panel";

type DsFrProps = { data: DsFrReport; url: string };

export const DsFr: React.FC<DsFrProps> = ({ data, url }) => {
  if (data === null) return null;
  return (
    <Panel title="Système de design de l'état">
      <p>
        Détection du système de design de l&apos;état avec la balise
        &apos;fr-header__brand&apos;{" "}
      </p>
      <br />
      {data.detected === true && (
        <Alert
          severity="success"
          title=""
          description={
            <>
              Le système de design de l&apos;état a bien été détecté sur{" "}
              <a href={url} target="_blank">
                {url}
              </a>
            </>
          }
        />
      )}
      {data.detected === false && (
        <Alert
          severity="error"
          title=""
          description={`Le système de design de l'état n'a pas été détecté sur ${url}. (balise fr-header__brand`}
        />
      )}
    </Panel>
  );
};
