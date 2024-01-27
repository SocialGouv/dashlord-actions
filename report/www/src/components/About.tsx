import * as React from "react";

import CallOut from "@codegouvfr/react-dsfr/CallOut";

export const About: React.FC = () => (
  <CallOut className="fr-mb-3w" title="À propos">
    DashLord est <strong>100% open source</strong>, vous pouvez y contribuer en
    créant de la documentation, en proposant du code, ou encore en partageant
    vos questions{" "}
    <a
      href="https://github.com/socialgouv/dashlord"
      target="_blank"
      rel="noopener noreferrer"
    >
      sur le repository github
    </a>
    .
    <br /> <br />
    L&apos;objectif de DashLord est d&apos;identifier des points
    d&apos;attention mais aussi de proposer des solutions actionnables.
    <br /> <br />
    DashLord est né à la{" "}
    <a
      href="https://fabrique.social.gouv.fr"
      target="_blank"
      rel="noopener noreferrer"
    >
      {" "}
      Fabrique des ministères sociaux
    </a>{" "}
    pour répondre aux besoins d&apos;évaluation et de mise en oeuvre des bonnes
    pratiques de développement web.
    <br /> <br />
    Vous pouvez facilement créer votre propre DashLord pour vos URLs en suivant{" "}
    <a
      href="https://github.com/SocialGouv/dashlord/blob/main/README.md"
      target="_blank"
      rel="noopener noreferrer"
    >
      les instructions sur le GitHub
    </a>
    .
  </CallOut>
);
