import * as React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { Panel } from "./Panel";

type BetagouvProps = { data: PageReport };

const GithubRepository: React.FC<BetagouvProps> = ({ data }) => {
  const url = data.url + "/" + data.uri;
  return (
    <Panel title="Ouverture du code source">
      <Alert
        severity={data.grade === "A" ? "success" : "error"}
        title={
          data.grade === "A"
            ? `Le dépôt de code est ouvert : ${url}`
            : "Le dépôt de code n'existe pas ou n'est pas ouvert."
        }
      />
    </Panel>
  );
};

export { GithubRepository };
