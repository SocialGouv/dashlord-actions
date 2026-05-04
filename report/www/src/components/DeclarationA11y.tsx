import * as React from "react";
import { Panel } from "./Panel";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

type DeclarationA11yProps = { data: DeclarationA11yReport };

export const DeclarationA11y: React.FC<DeclarationA11yProps> = ({ data }) => {
  const alerts = {
    mention: {
      "Accessibilité : totalement conforme": (
        <Alert
          severity="success"
          title="Conformité totale 🎉"
          description={
            <>La mention a bien été detectée : Totalement conforme</>
          }
        />
      ),
      "Accessibilité : partiellement conforme": (
        <Alert
          severity="success"
          title="Conformité partielle"
          description={
            <>La mention a bien été detectée : Partiellement conforme</>
          }
        />
      ),
      "Accessibilité : non conforme": (
        <Alert
          severity="info"
          title="non-conforme"
          description={<>La mention a bien été detectée : Non conforme</>}
        />
      ),
      null: (
        <Alert
          severity="error"
          title=""
          description={
            <>
              La mention de conformité n&apos;a pas été détectée. La mention «
              Accessibilité : non conforme » doit être présente sur chaque page.
            </>
          }
        ></Alert>
      ),
    },
    declaration: {
      true: (
        <Alert
          severity="success"
          title=""
          description={
            <>
              La déclaration est disponible sur :{" "}
              <a
                href={data.declarationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.declarationUrl}
              </a>
            </>
          }
        ></Alert>
      ),
      false: (
        <Alert
          severity="error"
          title=""
          description={
            <>
              La déclaration n&apos;a pas été trouvée. Utilisez le{" "}
              <a
                href="https://betagouv.github.io/a11y-generateur-declaration"
                target="_blank"
                rel="noopener noreferrer"
              >
                générateur de déclaration
              </a>{" "}
              pour en créer une.
            </>
          }
        ></Alert>
      ),
    },
    declarationUpToDate: {
      true: (
        <Alert
          severity="success"
          title=""
          description={`La déclaration est à jour (moins de 3 ans) : ${data.declarationDate}`}
        ></Alert>
      ),
      false: (
        <Alert
          severity="warning"
          title=""
          description={`La déclaration n'est pas à jour (plus de 3 ans) ou sa date n'a pas été détectée : ${data.declarationDate ?? "non trouvée"}`}
        ></Alert>
      ),
    },
  };
  return (
    (data && (
      <Panel title="Déclaration de mise en accessibilité">
        <p>
          Une mention de conformité pointant sur une déclaration
          d&apos;accessibilité est obligatoire sur les sites et applications de
          l&apos;état
        </p>
        <br />
        {alerts.mention[data.mention || "null"]}
        {alerts.declaration["" + !!data.declarationUrl]}
        {alerts.declarationUpToDate["" + !!data.declarationIsUpToDate]}
      </Panel>
    )) ||
    null
  );
};
