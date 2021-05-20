import * as React from "react";

import { Button, Jumbotron, Alert } from "react-bootstrap";
import { AlertTriangle, Info } from "react-feather";

import { Link } from "react-router-dom";

import { isToolEnabled } from "../utils";

import { Panel } from "./Panel";

const dashlordConfig: DashlordConfig  = require("../config.json");

export const Intro: React.FC = () => {
  return (
    <div>
      <br />
      <Jumbotron style={{ padding: "2em" }}>
        <h1>{dashlordConfig.title || "DashLord"}</h1>
        <br />
        Le tableau de bord aggrège les données issues de plusieurs
        outils qui évaluent chaque URL indépendamment.
        <br />
        <br />
        L'évaluation des outils ne remplace en aucun cas une expertise manuelle,
        et seule la page d'accueil du site est ici évaluée.
        <br />
        <br />
        Vous pouvez soumettre de nouvelles URLs, proposer des corrections ou
        consulter la roadmap en{" "}
        <a
          href="https://github.com/SocialGouv/dashlord/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          cliquant ici
        </a>
        .
        <br /><br />
        <br />
        <Link to="/dashboard">
          <Button variant="dark">Accéder au tableau de bord</Button>
        </Link>
      </Jumbotron>

      {isToolEnabled("lighthouse") && <Panel title="Google Lighthouse">
        Permet un audit automatique de page web :
        <br />
        <br />
        <li>Performances de chargement</li>
        <li>Bonnes pratiques SEO (référencement)</li>
        <li>Bonnes pratiques accessibilité (moteur Axe)</li>
        <li>Bonnes pratiques web</li>
        <br />
        <Alert variant="info">
          <Info size={16} style={{ marginRight: 5 }} />
          L'audit complet avec les recommandations de correction est disponible
          pour chaque URL
        </Alert>
        <Alert variant="warning">
          <AlertTriangle size={16} style={{ marginRight: 5 }} />
          Les mesures de performance, sont un instantané, donc pas forcément
          représentatives
          <br />
          <AlertTriangle size={16} style={{ marginRight: 5 }} /> Les mesures
          d'accessibilité n'abordent pas du tout{" "}
          <a
            href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
            rel="noopener noreferrer"
            target="_blank"
          >
            le RGAA
          </a>
          .
        </Alert>
        <Button
          variant="dark"
          href="https://developers.google.com/web/tools/lighthouse"
        >
          Site officiel
        </Button>
      </Panel>}

      {isToolEnabled("dependabot") && <Panel title="Dependabot">
        Recense les vulnérabilités de tes dépendances dans ton code
        <br />
        <br />
        <li>Scan des vulnérabilités de tes dépendances sur le dépôt Github du code</li>
        <br />
        <Button variant="dark" href="https://dependabot.com/">
          Site officiel
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          variant="dark"
          href="https://docs.github.com/en/code-security/supply-chain-security/about-alerts-for-vulnerable-dependencies"
        >
          Security scans
        </Button>
      </Panel>}

      {isToolEnabled("codescan") && <Panel title="Codescan">
        Recense les potentielles vulnérabilités dans ton code
        <br />
        <br />
        <li>Scan des potentielles vulnérabilités sur le dépôt Github du code</li>
        <li>Possibilité d'activer autant de scanner souhaité: CodeQL, etc</li>
        <li>Liste restreinte de langages couverts: C/C++, C#, Go, Java, JavaScript/TypeScript, Python</li>
        <br />
        <Button variant="dark" href="https://docs.github.com/en/code-security/secure-coding/about-code-scanning">
          Documentation
        </Button>
      </Panel>}

      {isToolEnabled("nmap") && <Panel title="Nmap">
        Nmap scan les vulnérabilités d'une machine (IP) associée à un domaine
        <br />
        <br />
        <li>Scan des ports ouverts avec vulnérabilités grâce au script vulners</li>
        <br />
        <Button variant="dark" href="https://nmap.org"
          style={{ marginLeft: 5 }}>
          Nmap
        </Button>
        <Button variant="dark" href="https://nmap.org/nsedoc/scripts/vulners.html">
          NSE vulners
        </Button>
      </Panel>}

      {isToolEnabled("zap") && <Panel title="OWASP Zed Attack Proxy">
        Scan de vulnérabilités passif "baseline" qui permet de détecter des
        risques de sécurité.
        <br />
        <br />
        <li>Bonnes pratiques web</li>
        <li>Bonnes pratiques http</li>
        <br />
        <Alert variant="info">
          <Info size={16} style={{ marginRight: 5 }} />
          L'audit complet avec les recommandations de correction est disponible
          pour chaque URL
        </Alert>
        <Button
          variant="dark"
          href="https://www.zaproxy.org/docs/docker/baseline-scan/"
        >
          Site officiel
        </Button>
      </Panel>}

      {isToolEnabled("testssl") && <Panel title="testssl.sh">
        Évalue le niveau de confiance d'un certificat SSL
        <br />
        <br />
        <li>Bonnes pratiques de configuration</li>
        <li>Protocoles disponibles</li>
        <li>Compatibilité navigateurs</li>
        <li>Solidité des clés de chiffrement</li>
        <br />
        <Alert variant="info">
          <Info size={16} style={{ marginRight: 5 }} />
          L'audit complet avec les recommandations de correction est disponible
          pour chaque URL
        </Alert>
        <br />
        <Button variant="dark" href="https://testssl.sh/">
          Site officiel
        </Button>
        &nbsp;
        <Button variant="dark" href="https://github.com/drwetter/testssl.sh">
          Code source
        </Button>
      </Panel>}

      {isToolEnabled("http") && <Panel title="Mozilla HTTP observatory">
        Évalue le niveau de qualité/sécurité de la page web et de son serveur
        <br />
        <br />
        <li>Bonnes pratiques de configuration</li>
        <li>Bonnes pratiques web</li>
        <li>Solidité des clés de chiffrement</li>
        <br />
        <Button variant="dark" href="https://observatory.mozilla.org/">
          Site officiel
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          variant="dark"
          href="https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/scoring.md"
        >
          Méthodologie
        </Button>
      </Panel>}

      {isToolEnabled("updownio") && <Panel title="Updown.io">
        Évalue les temps de réponse de son serveur
        <br />
        <br />
        <li>Disponibilité du site web avec calcul régulier de l'APDEX</li>
        <li>Validité des certificats TLS</li>
        <br />
        <Button variant="dark" href="https://updown.io/">
          Site officiel
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          variant="dark"
          href="https://updown.uservoice.com/knowledgebase/articles/915588-what-is-apdex"
        >
          APDEX
        </Button>
      </Panel>}

      {isToolEnabled("nuclei") && <Panel title="Nucléi">
        Détecte plus de 700 erreurs de configuration courantes sur les
        applications webs.
        <br />
        <br />
        <li>Sécurité</li>
        <li>Bonnes pratiques web</li>
        <br />
        <Button variant="dark" href="https://nuclei.projectdiscovery.io/">
          Site officiel
        </Button>
      </Panel>}

      {isToolEnabled("thirdparties") && <Panel title="Third-parties">
        Liste tous les scripts externes chargés par une URL et qui peuvent avoir
        un impact sur :
        <br />
        <br />
        <li>Performances web</li>
        <li>Sécurité</li>
        <li>Vie privée</li>
        <br />
        <Alert variant="warning">
          <AlertTriangle size={16} style={{ marginRight: 5 }} />
          Certains script légitimes peuvent apparaitre dans cette catégorie
          s'ils sont hébergés sur d'autres serveurs
        </Alert>
        <Button
          variant="dark"
          href="https://github.com/SocialGouv/thirdparties"
        >
          Code source
        </Button>
      </Panel>}

      {isToolEnabled("thirdparties") && <Panel title="GeoIP2">
        Géolocalise tous les serveurs contactés lors de l'ouverture d'une URL.
        <br />
        <br />
        <li>Vie privée</li>
        <br />
        <Button variant="dark" href="https://www.maxmind.com/en/geoip-demo">
          Site officiel
        </Button>
      </Panel>}

      {isToolEnabled("wappalyzer") && <Panel title="Wappalyzer">
        Wappalyzer reconnait +1500 technologies web, Javascript, CMS, outillage...
        <br />
        <br />
        <li>Stack technique</li>
        <li>Obsolescence</li>
        <li>Parc</li>
        <br />
        <Button variant="dark" href="https://www.wappalyzer.com/">
          Site officiel
        </Button>
      </Panel>}

    </div>
  );
};
