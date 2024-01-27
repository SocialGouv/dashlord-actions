import CallOut from "@codegouvfr/react-dsfr/CallOut";
import * as React from "react";

import { GradeBadge } from "./GradeBadge";
import { Panel } from "./Panel";
import { letterToSeverity } from "../utils";

type EcoIndexProps = { data: EcoIndexReport };

const Interpretation = ({ ges, h2o, visits = 1000 }) => {
  const footprintCo2 = (ges * visits) / 1000; // fourni en grammes
  const footPrintH2o = (h2o * visits) / 100; // fourni en centilitres
  const LITRES_EAU_MINUTE = 6;
  const minutesDouche = footPrintH2o / LITRES_EAU_MINUTE;
  const equivalentMinuteDouche =
    minutesDouche >= 60
      ? `${Math.floor(minutesDouche / 60)} heure(s) et ${
          minutesDouche % 60
        } minute(s)`
      : `${(minutesDouche % 60).toFixed(1)} minute(s)`;
  // reprend le chiffre de ecoindex : 1 kg CO2e équivaut à un trajet d’environ 3 km en voiture
  const equivalentTransport = `${(footprintCo2 / (1 / 3)).toFixed(
    1
  )} kilomètres`;
  return (
    <CallOut title="Ça veut dire quoi ?">
      Pour vous donner une idée, 1 kg CO2e équivaut à un trajet d’environ 3 km
      en voiture. Une douche consomme en moyenne 6 litres d’eau à la minute.
      <br />
      <br />
      Si votre page émet {ges}g CO2e et consomme {h2o}cl d’eau, cela signifie
      que pour {visits} visites mensuelles de cette page, l’empreinte sera de{" "}
      {footprintCo2} kg(s) de CO2e et {footPrintH2o} litre(s) d’eau par mois
      <br />
      <br />
      <strong>
        Soit pour {visits} visites : un trajet de {equivalentTransport} en
        voiture ou {equivalentMinuteDouche} de douche.
      </strong>
    </CallOut>
  );
};

export const EcoIndex: React.FC<EcoIndexProps> = ({ data }) => {
  const report = (data.length && data[0]) || null;
  if (!report) return null;

  const ges = report.ges;
  const h2o = report.water;

  return (
    (data && ges && h2o && (
      <Panel
        title="Eco-index"
        info="Score eco-index d'après green-it"
        url="https://www.ecoindex.fr/comment-ca-marche/"
        urlText="Qu'est-ce que l'éco index ?"
        isExternal={true}
      >
        <GradeBadge label={report.grade}></GradeBadge>
        &nbsp;
        <GradeBadge
          severity={letterToSeverity(report.grade)}
          label={`${report.score}/100`}
        ></GradeBadge>
        <br />
        <br />
        <h5>GES: {ges} gramme(s) par visite</h5>
        <h5>Eau : {h2o} cl par visite</h5> <br />
        <Interpretation ges={ges} h2o={h2o} visits={1000} />
      </Panel>
    )) ||
    null
  );
};
