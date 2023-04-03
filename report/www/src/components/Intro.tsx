import * as React from "react";

import {
  Button,
  Alert,
  Callout,
  CalloutText,
  CalloutTitle,
} from "@dataesr/react-dsfr";

import Link from "next/link";

import { isToolEnabled } from "../utils";

import { Panel } from "./Panel";

const dashlordConfig: DashlordConfig = require("../config.json");

const REPOSITORY_URL =
  process.env.NEXT_PUBLIC_REPOSITORY_URL ||
  "https://github.com/socialgouv/dashlord";

export const Intro: React.FC = () => (
  <>
    <Callout hasInfoIcon={false} className="fr-mb-3w">
      <CalloutTitle as="h1">{dashlordConfig.title || "DashLord"}</CalloutTitle>
      <CalloutText>
        <br />
        DashLord compile les données techniques issues de différents outils
        open-source.
        <br />
        Cette évaluation ne remplace en aucun cas une expertise manuelle, et
        seule la page d&apos;accueil du site est ici évaluée.
        <br />
        Vous pouvez{" "}
        <a
          href={`${REPOSITORY_URL}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
        >
          soumettre de nouvelles URLs, proposer des corrections
        </a>{" "}
        ou{" "}
        <a
          href="https://github.com/orgs/SocialGouv/projects/13"
          target="_blank"
          rel="noopener noreferrer"
        >
          consulter la roadmap
        </a>
        .
        <br />
        <br />
      </CalloutText>
      <Button>
        <Link href="/">Accéder au tableau de bord</Link>
      </Button>
    </Callout>

    {isToolEnabled("lighthouse") && (
      <Panel
        title="Google Lighthouse"
        url="https://developers.google.com/web/tools/lighthouse"
        urlText="Site officiel"
        isExternal
      >
        Permet un audit automatique de page web :
        <br />
        <br />
        <li>Performances de chargement</li>
        <li>Bonnes pratiques SEO (référencement)</li>
        <li>Bonnes pratiques accessibilité (moteur Axe)</li>
        <li>Bonnes pratiques web</li>
        <br />
        <Alert
          type="success"
          title=""
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
        <Alert
          type="info"
          title=""
          description="Les mesures de performance sont un instantané, donc pas forcément représentatives"
        />
        <Alert
          type="error"
          title=""
          description={
            <span>
              Les mesures d&apos;accessibilité n&apos;abordent pas du tout{" "}
              <a
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                rel="noopener noreferrer"
                target="_blank"
              >
                le RGAA
              </a>
              .
            </span>
          }
        />
      </Panel>
    )}

    {isToolEnabled("dependabot") && (
      <Panel
        title="Dependabot"
        url="https://dependabot.com/"
        urlText="Site officiel"
        isExternal
      >
        Recense les vulnérabilités de tes dépendances dans le code source
        <br />
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://docs.github.com/en/code-security/supply-chain-security/about-alerts-for-vulnerable-dependencies"
        >
          Scan des vulnérabilités des dépendances sur le dépôt Github du code
        </a>
        <br />
        <br />
        <Alert
          title=""
          type="info"
          description="Nécessite d'avoir activé Dependabot sur ses repositories GitHub"
        />
      </Panel>
    )}

    {isToolEnabled("codescan") && (
      <Panel
        title="Codescan"
        urlText="Documentation"
        url="https://docs.github.com/en/code-security/secure-coding/about-code-scanning"
        isExternal
      >
        Recense les potentielles vulnérabilités dans ton code
        <br />
        <br />
        <li>
          Scan des potentielles vulnérabilités sur le dépôt Github du code
        </li>
        <li>
          Possibilité d&apos;activer autant de scanner souhaité: CodeQL, etc
        </li>
        <li>
          Liste restreinte de langages couverts: C/C++, C#, Go, Java,
          JavaScript/TypeScript, Python
        </li>{" "}
        <br />
        <br />
        <Alert
          title=""
          type="info"
          description="Nécessite d'avoir activé CodeQL sur le repository"
        />
      </Panel>
    )}

    {isToolEnabled("nmap") && (
      <Panel
        title="Nmap"
        urlText="Site officiel"
        url="https://nmap.org"
        isExternal
      >
        Nmap scan les vulnérabilités d&apos;une machine (IP) associée à un
        domaine
        <br />
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://nmap.org/nsedoc/scripts/vulners.html"
        >
          Scan des ports ouverts avec vulnérabilités grâce au script vulners
        </a>
      </Panel>
    )}

    {isToolEnabled("zap") && (
      <Panel
        title="OWASP Zed Attack Proxy"
        urlText="Site officiel"
        url="https://www.zaproxy.org/docs/docker/baseline-scan/"
        isExternal
      >
        Scan de vulnérabilités passif &quot;baseline&quot; qui permet de
        détecter des risques de sécurité.
        <br />
        <br />
        <li>Bonnes pratiques web</li>
        <li>Bonnes pratiques http</li>
        <br />
        <Alert
          title=""
          type="info"
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
      </Panel>
    )}

    {isToolEnabled("testssl") && (
      <Panel
        title="testssl.sh"
        urlText="Site officiel"
        url="https://testssl.sh/"
        isExternal
        info={
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/drwetter/testssl.sh"
          >
            Code source
          </a>
        }
      >
        Évalue le niveau de confiance d&apos;un certificat SSL
        <br />
        <br />
        <li>Bonnes pratiques de configuration</li>
        <li>Protocoles disponibles</li>
        <li>Compatibilité navigateurs</li>
        <li>Solidité des clés de chiffrement</li>
        <br />
        <Alert
          title=""
          type="info"
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
      </Panel>
    )}

    {isToolEnabled("http") && (
      <Panel
        title="Mozilla HTTP observatory"
        urlText="Site officiel"
        info={
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/scoring.md"
          >
            Méthodologie
          </a>
        }
        url="https://observatory.mozilla.org/"
        isExternal
      >
        Évalue le niveau de qualité/sécurité de la page web et de son serveur
        <br />
        <br />
        <li>Bonnes pratiques de configuration</li>
        <li>Bonnes pratiques web</li>
        <li>Solidité des clés de chiffrement</li>
      </Panel>
    )}

    {isToolEnabled("updownio") && (
      <Panel
        title="Updown.io"
        urlText="Site officiel"
        info={
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://updown.uservoice.com/knowledgebase/articles/915588-what-is-apdex"
          >
            APDEX
          </a>
        }
        url="https://updown.io/"
        isExternal
      >
        Évalue la qualité de service rendue par le serveur
        <br />
        <br />
        <li>Temps de réponse</li>
        <li>Disponibilité</li>
        <li>Indice de performance : APDEX</li>
        <li>Validité des certificats TLS</li>
        <br />
        <Alert
          title=""
          type="info"
          description="Vous devez disposer d'un compte updown.io et d'une clé API"
        />
      </Panel>
    )}

    {isToolEnabled("nuclei") && (
      <Panel
        title="Nucléi"
        urlText="Site officiel"
        url="https://nuclei.projectdiscovery.io/"
        isExternal
      >
        Détecte plus de 700 erreurs de configuration courantes sur les
        applications webs.
        <br />
        <br />
        <li>Sécurité</li>
        <li>Bonnes pratiques web</li>
      </Panel>
    )}

    {isToolEnabled("thirdparties") && (
      <Panel
        title="Third-parties"
        urlText="Code source"
        url="https://github.com/SocialGouv/thirdparties"
        isExternal
      >
        Liste tous les scripts externes chargés par une URL et qui peuvent avoir
        un impact sur :
        <br />
        <br />
        <li>Performances web</li>
        <li>Sécurité</li>
        <li>Vie privée</li>
        <br />
        <Alert
          title="thirdparties"
          type="error"
          description="Certains script légitimes peuvent apparaitre dans cette catégorie s'ils sont hébergés sur d'autres serveurs"
        />
      </Panel>
    )}

    {isToolEnabled("thirdparties") && (
      <Panel
        title="GeoIP2"
        urlText="Site officiel"
        url="https://www.maxmind.com/en/geoip-demo"
        isExternal
      >
        Géolocalise tous les serveurs contactés lors de l&apos;ouverture
        d&apos;une URL.
        <br />
        <br />
        <li>Vie privée</li>
      </Panel>
    )}

    {isToolEnabled("wappalyzer") && (
      <Panel
        title="Wappalyzer"
        urlText="Site officiel"
        url="https://www.wappalyzer.com/"
        isExternal
      >
        Wappalyzer reconnait +1500 technologies web, Javascript, CMS,
        outillage...
        <br />
        <br />
        <li>Stack technique</li>
        <li>Obsolescence</li>
        <li>Parc</li>
      </Panel>
    )}

    {isToolEnabled("stats") && (
      <Panel title="Statistiques">
        Vérifie si la page /stats existe
        <br />
        <br />
        Par exemple:{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://beta.gouv.fr/stats"
        >
          Beta.gouv.fr
        </a>
      </Panel>
    )}

    {isToolEnabled("404") && (
      <Panel title="Erreurs 404">
        Explore le site web et détecte les liens brisés.
      </Panel>
    )}

    {isToolEnabled("trivy") && (
      <Panel
        title="Vulnérabilités Trivy"
        url="https://aquasecurity.github.io/trivy/"
        urlText="Site officiel"
        isExternal
      >
        Trivy permet de scanner les containers docker à la recherche de
        vulnérabilités connues.
        <br />
        <br />
        Trivy détecte les vulnérabilités niveau OS (Alpine, RHEL, CentOS, etc.)
        mais aussi niveau packages (Bundler, Composer, npm, yarn, etc.).
      </Panel>
    )}

    {isToolEnabled("ecoindex") && (
      <Panel
        title="Score eco-index"
        url="https://www.ecoindex.fr/quest-ce-que-ecoindex/"
        urlText="L'écoconception web"
        isExternal
      >
        EcoIndex est un outil communautaire, gratuit et transparent qui, pour
        une URL donnée, permet d’évaluer :
        <br /> sa performance environnementale absolue à l’aide d’un score sur
        100 (higher is better) ;
        <br /> sa performance environnementale relative à l’aide d’une note de A
        à G ;
        <br /> l’empreinte technique de la page (poids, complexité, etc.) ;
        <br /> l’empreinte environnementale associée (gaz à effet de serre et
        eau).
        <br />
        <br />
        L’objectif d’EcoIndex est d’aider le plus grand nombre à prendre
        conscience de l’impact environnemental de l’internet.
      </Panel>
    )}

    {isToolEnabled("sonarcloud") && (
      <Panel
        title="Score SonarCloud"
        url="https://sonarcloud.io/"
        urlText="Site officiel"
        isExternal
      >
        SonarCloud permet d&apos;analyser le code source des repositories et de
        détecter des bugs, vulnérabilités, duplications et autres indicateurs de
        qualité.
      </Panel>
    )}
  </>
);
