import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { Clock } from "react-feather";
import {
  Callout,
  CalloutTitle,
  CalloutText,
  Tabs,
  Tab,
} from "@dataesr/react-dsfr";

import { isToolEnabled } from "../utils";
import Badge from "./Badge";
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
import { Stats } from "./Stats";
import { Report404 } from "./404";
import { Trivy } from "./Trivy";

import styles from "./url.cssmodule.scss";

type UrlDetailProps = { url: string; report: UrlReport };

const Anchor = ({ id }: { id: string }) => <div id={id} />;

const Url: React.FC<UrlDetailProps> = ({ url, report }) => {
  const updateDate = report && report.lhr && report.lhr.fetchTime;
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
  if (!report) {
    return (
      <div>
        No data available for
        {url}
      </div>
    );
  }
  return (
    <>
      <Callout hasInfoIcon={false} className="fr-mb-3w">
        <CalloutTitle as="h4">
          <a href={url} rel="noreferrer noopener" target="_blank">
            {url}
          </a>
        </CalloutTitle>
        <CalloutText>
          {report.category && (
            <Badge
              className={styles.badge}
              variant="success"
              to={`/category/${report.category}`}
            >
              {report.category}
            </Badge>
          )}
          {report.tags &&
            report.tags.map((tag: string) => (
              <Badge
                className={styles.badge}
                variant="info"
                key={tag}
                to={`/tag/${tag}`}
              >
                {tag}
              </Badge>
            ))}
          {updateDate && (
            <>
              <Clock size={16} className={styles.clockIcon} />
              <span title={updateDate} className={styles.clock}>
                Mise à jour il y a :{" "}
                {formatDistanceToNow(new Date(updateDate), {
                  locale: frLocale,
                })}
              </span>
            </>
          )}
        </CalloutText>
        <div className={styles.image}>
          <img
            alt={`Copie d'écran de ${url}`}
            src={`${__PUBLIC_URL__}/report/${window.btoa(url)}/screenshot.jpeg`}
          />
        </div>
      </Callout>
      <Tabs>
        <Tab label="Bonnes pratiques">
          {isToolEnabled("lighthouse") && report.lhr && (
            <>
              <Anchor id="lighthouse" />
              <LightHouse
                data={report.lhr}
                url={`${__PUBLIC_URL__}/report/${window.btoa(url)}/lhr.html`}
              />
            </>
          )}
          {isToolEnabled("thirdparties") && report.thirdparties && (
            <>
              <Anchor id="thirdparties" />
              <Trackers data={report.thirdparties} />
            </>
          )}
          {isToolEnabled("stats") && report.stats && (
            <>
              <Anchor id="stats" />
              <Stats data={report.stats} url={url} />
            </>
          )}
          {(isToolEnabled("404") && report["404"] && report["404"].length && (
            <>
              <Anchor id="404" />
              <Report404 data={report["404"]} />
            </>
          )) ||
            null}
        </Tab>
        <Tab label="Performance">
          {isToolEnabled("updownio") && report.updownio && (
            <>
              <Anchor id="updownio" />
              <UpdownIo data={report.updownio} url={url} />
            </>
          )}
        </Tab>
        <Tab label="Sécurité">
          {isToolEnabled("nmap") && report.nmap && (
            <>
              <Anchor id="nmap" />
              <Nmap
                data={report.nmap}
                url={`${__PUBLIC_URL__}/report/${window.btoa(
                  url
                )}/nmapvuln.html`}
              />
            </>
          )}
          {isToolEnabled("http") && report.http && (
            <>
              <Anchor id="http" />
              <HTTP data={report.http} />
            </>
          )}

          {isToolEnabled("testssl") && report.testssl && (
            <>
              <Anchor id="testssl" />
              <TestSSL
                data={report.testssl}
                url={`${__PUBLIC_URL__}/report/${window.btoa(
                  url
                )}/testssl.html`}
              />
            </>
          )}

          {isToolEnabled("dependabot") &&
            report.dependabot &&
            report.dependabot.repositories && (
              <>
                <Anchor id="dependabot" />
                {report.dependabot.repositories
                  .filter(Boolean)
                  .map((repository) => (
                    <Dependabot
                      key={repository.url}
                      data={repository}
                      url={url}
                    />
                  ))}
              </>
            )}
          {isToolEnabled("codescan") &&
            report.codescan &&
            report.codescan.repositories && (
              <>
                <Anchor id="codescan" />
                {report.codescan.repositories
                  .filter(Boolean)
                  .map((repository) => (
                    <Codescan
                      key={repository.url}
                      data={repository}
                      url={url}
                    />
                  ))}
              </>
            )}
          {isToolEnabled("zap") && report.zap && (
            <>
              <Anchor id="zap" />
              <Owasp
                data={report.zap}
                url={`${__PUBLIC_URL__}/report/${window.btoa(url)}/zap.html`}
              />
            </>
          )}
          {isToolEnabled("nuclei") && report.nuclei && (
            <>
              <Anchor id="nuclei" />
              <Nuclei data={report.nuclei} />
            </>
          )}

          {(isToolEnabled("trivy") &&
            report["trivy"] &&
            report["trivy"].length && (
              <>
                <Anchor id="trivy" />
                <Trivy data={report["trivy"]} />
              </>
            )) ||
            null}

          {isToolEnabled("wappalyzer") && report.wappalyzer && (
            <>
              <Anchor id="wappalyzer" />
              <Wappalyzer data={report.wappalyzer} />
            </>
          )}
        </Tab>
      </Tabs>
    </>
  );
};

export default Url;
