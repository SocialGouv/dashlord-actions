import * as React from 'react';

import {
  Button, Alert, Callout, CalloutText, CalloutTitle,
} from '@dataesr/react-dsfr';

import { Link } from 'react-router-dom';

import { isToolEnabled } from '../utils';

import { Panel } from './Panel';

const dashlordConfig: DashlordConfig = require('../config.json');

export const Intro: React.FC = () => (
  <>
    <Callout hasInfoIcon={false} className="fr-mb-3w">
      <CalloutTitle as="h1">{dashlordConfig.title || 'DashLord'}</CalloutTitle>
      <CalloutText>
        Le tableau de bord aggrège les données issues de plusieurs
        outils qui évaluent chaque URL indépendamment.
        <br />
        L'évaluation des outils ne remplace en aucun cas une expertise manuelle,
        et seule la page d'accueil du site est ici évaluée.
        <br />
        Vous pouvez soumettre de nouvelles URLs, proposer des corrections ou
        consulter la roadmap en
        {' '}
        <a
          href="https://github.com/SocialGouv/dashlord/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          cliquant ici
        </a>
        .
      </CalloutText>
      <Link to="/dashboard">
        <Button>Accéder au tableau de bord</Button>
      </Link>
    </Callout>

    {isToolEnabled('lighthouse') && (
      <Panel title="Google Lighthouse" url="https://developers.google.com/web/tools/lighthouse" isExternal>
        Permet un audit automatique de page web :
        <br />
        <br />
        <li>Performances de chargement</li>
        <li>Bonnes pratiques SEO (référencement)</li>
        <li>Bonnes pratiques accessibilité (moteur Axe)</li>
        <li>Bonnes pratiques web</li>
        <br />
        <Alert
          type="info"
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
        <Alert
          type="warning"
          description="Les mesures de performance, sont un instantané, donc pas forcément représentatives"
        />
        <Alert
          type="warning"
          description={(
            <span>
              Les mesures
              d'accessibilité n'abordent pas du tout
              {' '}
              <a
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                rel="noopener noreferrer"
                target="_blank"
              >
                le RGAA
              </a>
              .
            </span>
          )}
        />
      </Panel>
    )}

    {isToolEnabled('dependabot') && (
      <Panel title="Dependabot" url="https://dependabot.com/" isExternal>
        Recense les vulnérabilités de tes dépendances dans ton code
        <br />
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://docs.github.com/en/code-security/supply-chain-security/about-alerts-for-vulnerable-dependencies"
        >
          Scan des vulnérabilités de tes dépendances sur le dépôt Github du code
        </a>
      </Panel>
    )}

    {isToolEnabled('codescan') && (
      <Panel title="Codescan" url="https://docs.github.com/en/code-security/secure-coding/about-code-scanning" isExternal>
        Recense les potentielles vulnérabilités dans ton code
        <br />
        <br />
        <li>Scan des potentielles vulnérabilités sur le dépôt Github du code</li>
        <li>Possibilité d'activer autant de scanner souhaité: CodeQL, etc</li>
        <li>Liste restreinte de langages couverts: C/C++, C#, Go, Java, JavaScript/TypeScript, Python</li>
      </Panel>
    )}

    {isToolEnabled('nmap') && (
      <Panel title="Nmap" url="https://nmap.org" isExternal>
        Nmap scan les vulnérabilités d'une machine (IP) associée à un domaine
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

    {isToolEnabled('zap') && (
      <Panel title="OWASP Zed Attack Proxy" url="https://www.zaproxy.org/docs/docker/baseline-scan/" isExternal>
        Scan de vulnérabilités passif "baseline" qui permet de détecter des
        risques de sécurité.
        <br />
        <br />
        <li>Bonnes pratiques web</li>
        <li>Bonnes pratiques http</li>
        <br />
        <Alert
          type="info"
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
      </Panel>
    )}

    {isToolEnabled('testssl') && (
      <Panel
        title="testssl.sh"
        url="https://testssl.sh/"
        isExternal
        info={(
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/drwetter/testssl.sh"
          >
            Code source
          </a>
      )}
      >
        Évalue le niveau de confiance d'un certificat SSL
        <br />
        <br />
        <li>Bonnes pratiques de configuration</li>
        <li>Protocoles disponibles</li>
        <li>Compatibilité navigateurs</li>
        <li>Solidité des clés de chiffrement</li>
        <Alert
          type="info"
          description="L'audit complet avec les recommandations de correction est disponible pour chaque URL"
        />
      </Panel>
    )}

    {isToolEnabled('http') && (
      <Panel
        title="Mozilla HTTP observatory"
        info={(
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/scoring.md"
          >
            Méthodologie
          </a>
      )}
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

    {isToolEnabled('updownio') && (
      <Panel
        title="Updown.io"
        info={(
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://updown.uservoice.com/knowledgebase/articles/915588-what-is-apdex"
          >
            APDEX
          </a>
      )}
        url="https://updown.io/"
        isExternal
      >
        Évalue les temps de réponse de son serveur
        <br />
        <br />
        <li>Disponibilité du site web avec calcul régulier de l'APDEX</li>
        <li>Validité des certificats TLS</li>
      </Panel>
    )}

    {isToolEnabled('nuclei') && (
      <Panel title="Nucléi" url="https://nuclei.projectdiscovery.io/" isExternal>
        Détecte plus de 700 erreurs de configuration courantes sur les
        applications webs.
        <br />
        <br />
        <li>Sécurité</li>
        <li>Bonnes pratiques web</li>
      </Panel>
    )}

    {isToolEnabled('thirdparties') && (
      <Panel title="Third-parties" url="https://github.com/SocialGouv/thirdparties" isExternal>
        Liste tous les scripts externes chargés par une URL et qui peuvent avoir
        un impact sur :
        <br />
        <br />
        <li>Performances web</li>
        <li>Sécurité</li>
        <li>Vie privée</li>
        <Alert
          type="warning"
          description="Certains script légitimes peuvent apparaitre dans cette catégorie s'ils sont hébergés sur d'autres serveurs"
        />
      </Panel>
    )}

    {isToolEnabled('thirdparties') && (
      <Panel title="GeoIP2" url="https://www.maxmind.com/en/geoip-demo" isExternal>
        Géolocalise tous les serveurs contactés lors de l'ouverture d'une URL.
        <br />
        <br />
        <li>Vie privée</li>
      </Panel>
    )}

    {isToolEnabled('wappalyzer') && (
      <Panel title="Wappalyzer" url="https://www.wappalyzer.com/" isExternal>
        Wappalyzer reconnait +1500 technologies web, Javascript, CMS, outillage...
        <br />
        <br />
        <li>Stack technique</li>
        <li>Obsolescence</li>
        <li>Parc</li>
      </Panel>
    )}

    {isToolEnabled('stats') && (
      <Panel title="Statistiques">
        Vérifie si la page /stats existe
        <br />
        <br />
        Par exemple:
        {' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://beta.gouv.fr/stats"
        >
          Beta.gouv.fr
        </a>
      </Panel>
    )}

  </>
);
