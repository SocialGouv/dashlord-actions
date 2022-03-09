import * as React from "react";
import { Panel } from "./Panel";
import { Alert, Table } from "@dataesr/react-dsfr";

type DeclarationRgpdProps = { data: DeclarationRgpdReport };

export const DeclarationRgpd: React.FC<DeclarationRgpdProps> = ({ data }) => {
  const [mlData] = React.useState(
    data && data.find && data.find((_) => _.slug === "ml")
  );
  const [pcData] = React.useState(
    data && data.find && data.find((_) => _.slug === "pc")
  );

  const getMissingWordsResolution = (slug) => {
    if (slug === "ml") {
      return (
        <>
          Appliquer le modèle suivant :{" "}
          <a href="https://github.com/betagouv/juridiques/blob/main/Mentions-l%C3%A9gales.md">
            https://github.com/betagouv/juridiques/blob/main/Mentions-l%C3%A9gales.md
          </a>
        </>
      );
    } else if (slug === "pc") {
      return (
        <>
          Rendez vous sur{" "}
          <a href="https://mattermost.incubateur.net/betagouv/channels/domaine-juridique">
            https://mattermost.incubateur.net/betagouv/channels/domaine-juridique
          </a>
        </>
      );
    }
  };

  const getMissingTrackersTable = (itemData: DeclarationRgpdItem) => {
    return (
      <div style={{ display: "flex" }}>
        <Table
          columns={[
            { name: "word", label: "Tracker manquant" },
            { name: "resolution", label: "Remédiation" },
          ]}
          data={itemData.missingTrackers.map((word: string, index: number) => ({
            key: index,
            resolution: (
              <>
                Vous devez impérativement mentionner le tracker <b>{word}</b>{" "}
                dans votre politique de confidentialité.
              </>
            ),
            word,
          }))}
          rowKey={"key"}
        />
      </div>
    );
  };

  const getMissingWordsTable = (itemData: DeclarationRgpdItem) => {
    return (
      <div style={{ display: "flex" }}>
        <Table
          columns={[{ name: "word", label: "Mot manquant" }]}
          data={itemData.missingWords.map((word: string, index: number) => ({
            key: index,
            word,
          }))}
          rowKey={"key"}
        />
        <Table
          columns={[{ name: "resolution", label: "Remédiation" }]}
          data={[
            {
              key: 1,
              resolution: getMissingWordsResolution(itemData.slug),
            },
          ]}
          rowKey={"key"}
        />
      </div>
    );
  };

  const getPresenceAlerts = (itemData: DeclarationRgpdItem) => {
    if (!itemData.mention) {
      return (
        <Alert type="error" description={<>Pas de déclaration détectée</>} />
      );
    } else if (itemData.score < itemData.maxScore) {
      return (
        <>
          <Alert
            type="info"
            description={
              <>
                Votre déclaration a bien été détectée sur :{" "}
                <a href={itemData.declarationUrl}>{itemData.declarationUrl}</a>
                <br />
                <br />
                Cependant, certaines informations sont manquantes. Consultez le
                tableau détaillé ci-dessous.
              </>
            }
          />
          {itemData.missingWords.length ? (
            getMissingWordsTable(itemData)
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
          type="success"
          description={
            <>
              Votre déclaration a bien été détecté sur :{" "}
              <a href={itemData.declarationUrl}>{itemData.declarationUrl}</a>
            </>
          }
        />
      );
    }
  };

  return (
    (data && (
      <>
        {mlData && (
          <Panel
            title="Mentions légales"
            info="Les mentions légales sont une page obligatoire qui présente les personnes chargées de la plateforme"
          >
            {getPresenceAlerts(mlData)}
          </Panel>
        )}
        {pcData && (
          <Panel
            title="Politique de confidentialité"
            info="La politique de confidentialité est une page présentant aux utilisateurs les traitements de données personnelles et les éventuelles trackers"
          >
            {getPresenceAlerts(pcData)}
          </Panel>
        )}
      </>
    )) ||
    null
  );
};
