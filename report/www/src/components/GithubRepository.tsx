import * as React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { Panel } from "./Panel";

type BetagouvProps = { data: PageReport };

const GithubRepository: React.FC<BetagouvProps> = ({ data }) => {
  const url = data.url + "/" + data.uri;
  return (
    <Panel title="Ouverture du code source">
      <p>Publication du code-source du produit.</p>
      <br />
      <Alert
        severity={data.grade === "A" ? "success" : "error"}
        title={
          data.grade === "A" ? (
            <>
              Le dépôt de code est ouvert :{" "}
              <a href={url} target="_blank">
                {url}
              </a>
            </>
          ) : (
            "Le dépôt de code n'existe pas ou n'est pas ouvert."
          )
        }
      />
    </Panel>
  );
};

export { GithubRepository };
