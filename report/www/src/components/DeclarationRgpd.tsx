import * as React from "react";
import { Panel } from "./Panel";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Table } from "@codegouvfr/react-dsfr/Table";

type DeclarationRgpdProps = { data: DeclarationRgpdReport };

export const DeclarationRgpd: React.FC<DeclarationRgpdProps> = ({ data }) => {
  const mlData = data && data.find && data.find((_) => _.slug === "ml");
  const pcData = data && data.find && data.find((_) => _.slug === "pc");

  const getMissingWordsResolution = (slug) => {
    if (slug === "ml") {
      return (
        <>
          Appliquer le modèle suivant :{" "}
          <a
            href="https://github.com/betagouv/juridiques/blob/main/Mentions-l%C3%A9gales.md"
            target="_blank"
          >
            https://github.com/betagouv/juridiques/blob/main/Mentions-légales.md
          </a>
        </>
      );
    } else if (slug === "pc") {
      return (
        <>
          Rendez vous sur{" "}
          <a
            href="https://mattermost.incubateur.net/betagouv/channels/domaine-juridique"
            target="_blank"
          >
            https://mattermost.incubateur.net/betagouv/channels/domaine-juridique
          </a>
        </>
      );
    }
  };

  const getMissingTrackersTable = (itemData: DeclarationRgpdItem) => {
    const columns = [
      { name: "word", label: "Tracker manquant" },
      { name: "resolution", label: "Remédiation" },
    ];
    const tableData = [
      columns.map((col) => col.name),
      ...itemData.missingTrackers.map((word: string, index: number) => [
        word,
        <>
          Vous devez impérativement mentionner le tracker <b>{word}</b> dans
          votre politique de confidentialité.
        </>,
      ]),
    ];
    return (
      <div style={{ display: "flex" }}>
        <Table data={tableData} />
      </div>
    );
  };

  const getMissingWordsTable = (itemData: DeclarationRgpdItem, slug) => {
    const resolution = getMissingWordsResolution(slug);

    const columns = [
      { name: "word", label: "Mot manquant" },
      { name: "resolution" },
    ];
    const tableData = [
      columns.map((col) => col.name),
      ...itemData.missingWords.map((word: string, index: number) => [
        word,
        resolution,
      ]),
    ];
    return (
      <div style={{ display: "flex" }}>
        <Table data={tableData} />
      </div>
    );
  };

  const getPresenceAlerts = (itemData: DeclarationRgpdItem, slug) => {
    if (!itemData || !itemData.mention) {
      return (
        <>
          <Alert
            severity="error"
            title="Erreur"
            description={<>Pas de déclaration détectée. </>}
          />
          <Alert
            severity="error"
            title="Déclaration incomplète"
            description={<>{getMissingWordsResolution(slug)} </>}
          />
        </>
      );
    } else if (!itemData.declarationUrl) {
      return (
        <Alert
          severity="error"
          title="mention-no-declaration"
          description={<>Mention présente mais pas de déclaration détectée</>}
        />
      );
    } else if (itemData.score < itemData.maxScore) {
      return (
        <>
          <Alert
            severity="info"
            title="declaration-ok-incomplete"
            description={
              <>
                Votre déclaration a bien été détectée sur :{" "}
                <a
                  href={itemData.declarationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {itemData.declarationUrl}
                </a>
                <br />
                <br />
                Cependant, certaines informations sont manquantes. Consultez le
                tableau détaillé ci-dessous.
              </>
            }
          />
          {itemData.missingWords.length ? (
            getMissingWordsTable(itemData, slug)
          ) : (
            <></>
          )}
          {itemData.missingTrackers.length ? (
            getMissingTrackersTable(itemData)
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return (
        <Alert
          severity="success"
          title="declaration-ok"
          description={
            <>
              Votre déclaration a bien été détectée sur :{" "}
              <a
                href={itemData.declarationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {itemData.declarationUrl}
              </a>
            </>
          }
        />
      );
    }
  };

  return (
    <>
      <Panel title="Mentions légales">
        <p>
          Les mentions légales sont une page obligatoire qui présente les
          personnes chargées de la plateforme
        </p>
        <br />
        {getPresenceAlerts(mlData, "ml")}
      </Panel>
      <Panel title="Politique de confidentialité" info="">
        <p>
          La politique de confidentialité présente aux utilisateurs les
          traitements de données personnelles et les éventuelles trackers
        </p>
        <br />
        {getPresenceAlerts(pcData, "pc")}
      </Panel>
    </>
  );
};
