import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { Alert } from "@dataesr/react-dsfr";

type DeclarationA11yProps = { data: DeclarationA11yReport };

export const DeclarationA11y: React.FC<DeclarationA11yProps> = ({ data }) => {
  const alerts = {
    mention: {
      "Accessibilité : totalement conforme": (
        <Alert
          type="success"
          description={
            <div>La mention a bien été detectée : Totalement conforme</div>
          }
        />
      ),
      "Accessibilité : partiellement conforme": (
        <Alert
          type="warning"
          description={
            <div>La mention a bien été detectée : Partiellement conforme</div>
          }
        />
      ),
      "Accessibilité : non conforme": (
        <Alert
          type="error"
          description={<div>La mention a bien été detectée : Non conforme</div>}
        />
      ),
      null: (
        <Alert
          type="error"
          title=""
          description={
            <div>
              La mention de conformité n'a pas été détectée. La mention «
              Accessibilité : non conforme » doit être présente sur chaque page.
            </div>
          }
        ></Alert>
      ),
    },
    declaration: {
      true: (
        <Alert
          type="success"
          title=""
          description={
            <div>
              La déclaration est disponible sur :{" "}
              <a
                href={data.declarationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.declarationUrl}
              </a>
            </div>
          }
        ></Alert>
      ),
      false: (
        <Alert
          type="error"
          title=""
          description={
            <div>
              La déclaration n'a pas été trouvée. Utilisez le{" "}
              <a
                href="https://betagouv.github.io/a11y-generateur-declaration"
                target="_blank"
                rel="noopener noreferrer"
              >
                générateur de déclaration
              </a>{" "}
              pour en créer une.
            </div>
          }
        ></Alert>
      ),
    },
  };
  return (
    (data && (
      <Panel
        title="Déclaration de mise en accessibilité"
        info="Une mention de conformité pointant sur une déclaration d'accessibilité est obligatoire sur les sites et applications de l'état"
      >
        {alerts.mention[data.mention || "null"]}
        {alerts.declaration["" + !!data.declarationUrl]}
      </Panel>
    )) ||
    null
  );
};
