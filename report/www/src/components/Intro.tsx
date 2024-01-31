import * as React from "react";
import Link from "next/link";

import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import CallOut from "@codegouvfr/react-dsfr/CallOut";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import Markdown from "react-markdown";

import { fr } from "@codegouvfr/react-dsfr/fr";

import { isToolEnabled } from "../utils";
import { Panel } from "./Panel";
import dashlordConfig from "@/config.json";

const REPOSITORY_URL =
  process.env.NEXT_PUBLIC_REPOSITORY_URL ||
  "https://github.com/socialgouv/dashlord";

import tools from "../tools.json";

export const Intro: React.FC = () => {
  return (
    <>
      <CallOut className="fr-mb-3w" title={dashlordConfig.title || "DashLord"}>
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
        <Button>
          <Link href="/">Accéder au tableau de bord</Link>
        </Button>
      </CallOut>
      <h2>Les outils utilisés dans DashLord</h2>
      {Object.entries(tools).map(
        // @ts-ignore TODO with JSON import / JSON schema
        ([id, data]: [
          id: DashlordTool,
          data: {
            label: string;
            url: string;
            description: string;
            warning?: string;
            info?: string;
            tags?: string[];
          }
        ]) => {
          return (
            isToolEnabled(id) && (
              <Panel
                key={id}
                title={
                  <>
                    {data.label}
                    {data.tags.map((tag) => (
                      <Badge
                        key={tag}
                        severity="success"
                        className={fr.cx("fr-ml-1w")}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </>
                }
                url={data.url}
              >
                <br />
                <Markdown>{data.description}</Markdown>
                <br />
                {data.warning && (
                  <Alert
                    severity="warning"
                    title=""
                    description={<Markdown>{data.warning}</Markdown>}
                    className={fr.cx("fr-mb-3w")}
                  />
                )}
                {data.info && (
                  <Alert
                    severity="info"
                    title=""
                    description={<Markdown>{data.info}</Markdown>}
                    className={fr.cx("fr-mb-3w")}
                  />
                )}
              </Panel>
            )
          );
        }
      )}
    </>
  );
};
