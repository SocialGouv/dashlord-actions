import * as React from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";

import Tabs from "@codegouvfr/react-dsfr/Tabs";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { FrIconClassName } from "@codegouvfr/react-dsfr";

import { HTTP } from "./HTTP";
import { LightHouse } from "./LightHouse";
import { Nuclei } from "./Nuclei";
import { Owasp } from "./Owasp";
import { TestSSL } from "./TestSSL";
import { Trackers } from "./Trackers";
import { Wappalyzer } from "./Wappalyzer";
import { UpdownIo } from "./UpdownIo";
import { Dependabot } from "./Dependabot";
import { Codescan } from "./Codescan";
import { Nmap } from "./Nmap";
import { Report404 } from "./404";
import { Trivy } from "./Trivy";
import { DeclarationA11y } from "./DeclarationA11y";
import { DeclarationRgpd } from "./DeclarationRgpd";
import { UrlHeader } from "./UrlHeader";
import { Panel } from "./Panel";
import { Page } from "./Page";
import { Betagouv } from "./BetagouvInfo";
import { GithubRepository } from "./GithubRepository";
import { EcoIndex } from "./EcoIndex";
import { SonarCloud } from "./SonarCloud";
import { DsFr } from "./DsFr";

import { isToolEnabled, slugifyUrl, btoa } from "../utils";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

type UrlDetailProps = { url: string; report: UrlReport; selectedTab?: string };

const Anchor = ({ id }: { id: string }) => <div id={id} />;

// define tabs structure
const tabs: {
  label: string;
  id: string;
  icon: FrIconClassName;
  items: { id: string; reportKey?: string; render: any }[];
}[] = [
  {
    label: "Bonnes pratiques",
    id: "best-practices",
    icon: "fr-icon-thumb-up-line",
    items: [
      {
        id: "lighthouse",
        reportKey: "lhr",
        render: (report, url) => (
          <LightHouse
            data={report.lhr}
            url={`${BASE_PATH}/report/${btoa(url)}`}
          />
        ),
      },
      {
        id: "dsfr",
        reportKey: "dsfr",
        render: (report, url) => <DsFr data={report.dsfr} url={url} />,
      },
      {
        id: "ecoindex",
        reportKey: "ecoindex",
        render: (report, url) => <EcoIndex data={report.ecoindex} />,
      },
      {
        id: "thirdparties",
        render: (report) => <Trackers data={report.thirdparties} />,
      },
      {
        id: "stats",
        render: (report: UrlReport, url) =>
          report.stats && report.betagouv ? (
            <Panel title="Page de statistiques">
              <p>Cette page permet de publier vos mesures d&apos;impact</p>
              <br />
              <Page
                data={report.stats}
                url={report.betagouv.attributes.stats_url}
              />
            </Panel>
          ) : null,
      },
      {
        id: "budget_page",
        render: (report: UrlReport, url) =>
          report.budget_page && report.betagouv ? (
            <Panel title="Page de budget">
              <p>Cette page permet de publier votre budget</p>
              <br />
              <Page
                data={report.budget_page}
                url={report.betagouv.attributes.budget_url}
              />
            </Panel>
          ) : null,
      },
      {
        id: "declaration-a11y",
        render: (report, url) => (
          <DeclarationA11y data={report["declaration-a11y"]} />
        ),
      },
      {
        id: "declaration-rgpd",
        render: (report, url) => (
          <DeclarationRgpd data={report["declaration-rgpd"]} />
        ),
      },
      {
        id: "404",
        render: (report, url) => <Report404 data={report["404"]} />,
      },
      {
        id: "github_repository",
        render: (report: UrlReport) =>
          report.github_repository &&
          report.betagouv && (
            <GithubRepository
              url={report.betagouv.attributes.repository}
              data={report.github_repository}
            />
          ),
      },
    ],
  },
  {
    label: "Disponibilité",
    id: "disponibilite",
    icon: "fr-icon-time-line", //<Zap size={16} style={{ marginRight: 5, marginBottom: -2 }} />,
    items: [
      {
        id: "updownio",
        render: (report, url) => <UpdownIo data={report.updownio} url={url} />,
      },
    ],
  },
  {
    label: "Sécurité",
    id: "securite",
    icon: "fr-icon-lock-line", //<Lock size={16} style={{ marginRight: 5, marginBottom: -2 }} />,
    items: [
      {
        id: "nmap",
        render: (report, url) => (
          <Nmap
            data={report.nmap}
            url={`${BASE_PATH}/report/${btoa(url)}/nmapvuln.html`}
          />
        ),
      },
      {
        id: "http",
        render: (report, url) => <HTTP data={report.http} />,
      },
      {
        id: "testssl",
        render: (report, url) => (
          <TestSSL
            data={report.testssl}
            url={`${BASE_PATH}/report/${btoa(url)}/testssl.html`}
          />
        ),
      },
      {
        id: "dependabot",
        render: (report, url) =>
          report.dependabot.repositories &&
          report.dependabot.repositories
            .filter(Boolean)
            .map((repository) => (
              <Dependabot key={repository.url} data={repository} url={url} />
            )),
      },
      {
        id: "codescan",
        render: (report, url) =>
          report.codescan.repositories &&
          report.codescan.repositories
            .filter(Boolean)
            .map((repository) => (
              <Codescan key={repository.url} data={repository} url={url} />
            )),
      },
      {
        id: "zap",
        render: (report, url) => (
          <Owasp
            data={report.zap}
            url={`${BASE_PATH}/report/${btoa(url)}/zap.html`}
          />
        ),
      },
      {
        id: "nuclei",
        render: (report, url) => <Nuclei data={report.nuclei} />,
      },
      {
        id: "trivy",
        render: (report, url) =>
          (report["trivy"].length && (
            <Trivy
              data={report["trivy"]}
              url={`${BASE_PATH}/report/${btoa(url)}/trivy.json`}
            />
          )) ||
          null,
      },
      {
        id: "sonarcloud",
        render: (report, url) =>
          (report["sonarcloud"].length && (
            <SonarCloud data={report["sonarcloud"]} />
          )) ||
          null,
      },
    ],
  },
  {
    label: "Informations",
    id: "informations",
    icon: "fr-icon-info-line",
    items: [
      {
        id: "wappalyzer",
        render: (report) => <Wappalyzer data={report.wappalyzer} />,
      },
      {
        id: "betagouv",
        render: (report) => <Betagouv data={report.betagouv} />,
      },
    ],
  },
];

export const Url: React.FC<UrlDetailProps> = ({
  url,
  report,
  selectedTab = "best-practices",
}) => {
  const router = useRouter();
  React.useEffect(() => {
    const hash = document.location.hash.split("#");
    if (hash.length === 3) {
      // double hash + HashRouter workaround
      const target = document.getElementById(hash[2]);
      if (target) {
        target.scrollIntoView();
      }
    }
  }, [report]);

  const tabsContent = useMemo(
    () =>
      tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        // find all applicable items
        const items =
          isSelected &&
          tab.items
            .filter(
              (item) =>
                report &&
                !!report[item.reportKey || item.id] &&
                isToolEnabled(item.id as DashlordTool)
            )
            .map((item) => (
              <div key={item.id}>
                <Anchor id={item.id} />
                {item.render(report, url)}
              </div>
            ));
        return {
          tabId: tab.id,
          label: tab.label,
          //<Link href={`/url/${slugifyUrl(url)}/${tab.id}`}>{tab.label}</Link>
          iconId: tab.icon,
          content:
            items && items.length ? (
              items
            ) : (
              <Alert
                severity="error"
                title="warn-no-info"
                description={
                  <>Aucune information trouvée dans cette catégorie</>
                }
              />
            ),
          isDefault: isSelected,
        };
      }),
    [selectedTab, url]
  );

  if (!report) {
    return (
      <div>
        No data available for
        {url}
      </div>
    );
  }

  const tabContent = tabsContent.find(
    (tab) => tab.tabId === selectedTab
  ).content;

  return (
    <>
      <UrlHeader report={report} url={url} />

      <Tabs
        selectedTabId={selectedTab}
        onTabChange={(id) => {
          router.push(`/url/${slugifyUrl(url)}/${id}`);
        }}
        tabs={tabsContent}
      >
        {tabContent}
      </Tabs>
    </>
  );
};
