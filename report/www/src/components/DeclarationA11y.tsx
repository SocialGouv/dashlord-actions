import * as React from "react";
import { Panel } from "./Panel";
import { Grade } from "./Grade";
import { Alert } from "@dataesr/react-dsfr";

type DeclarationA11yProps = { data: string };

export const DeclarationA11y: React.FC<DeclarationA11yProps> = ({ data }) => {
  const alerts = {
    A: (
      <Alert
        type="success"
        description={
          <div>La mention a bien été detectée : Totalement conforme</div>
        }
      />
    ),
    B: (
      <Alert
        type="warning"
        description={
          <div>La mention a bien été detectée : Partiellement conforme</div>
        }
      />
    ),
    C: (
      <Alert
        type="error"
        description={<div>La mention a bien été detectée : Non conforme</div>}
      />
    ),
  };
  return (
    (data && (
      <Panel
        title="Déclaration de mise en accessibilité"
        info="Cette mention est obligatoire sur les sites et applications de l'état"
      >
        {alerts[data] || (
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
          >
            czefez
          </Alert>
        )}
      </Panel>
    )) ||
    null
  );
};
