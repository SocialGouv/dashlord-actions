import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { Alert } from "@dataesr/react-dsfr";

type DeclarationA11yProps = { data: DeclarationA11yReport };

export const DeclarationA11y: React.FC<DeclarationA11yProps> = ({ data }) => {
  const declarationUrlBlock = data.declarationUrl && (
    <div>
      <br />
      La déclaration est disponible sur :
      <a href={data.declarationUrl} target="_blank" rel="noopener noreferrer">
        {data.declarationUrl}
      </a>
    </div>
  );

  const alerts = {
    "Accessibilité : totalement conforme": (
      <Alert
        type="success"
        description={
          <div>
            La mention a bien été detectée : Totalement conforme
            {declarationUrlBlock}
          </div>
        }
      />
    ),
    "Accessibilité : partiellement conforme": (
      <Alert
        type="warning"
        description={
          <div>
            La mention a bien été detectée : Partiellement conforme
            {declarationUrlBlock}
          </div>
        }
      />
    ),
    "Accessibilité : non conforme": (
      <Alert
        type="error"
        description={
          <div>
            La mention a bien été detectée : Non conforme
            {declarationUrlBlock}
          </div>
        }
      />
    ),
  };
  return (
    (data && (
      <Panel
        title="Déclaration de mise en accessibilité"
        info="La déclaration est obligatoire sur les sites et applications de l'état"
      >
        {(data.mention && alerts[data.mention]) || (
          <Alert
            type="error"
            title=""
            description={
              <div>
                La mention d'accessibilité n'a pas été trouvée sur la page.
                Utilisez le{" "}
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
        )}
      </Panel>
    )) ||
    null
  );
};
