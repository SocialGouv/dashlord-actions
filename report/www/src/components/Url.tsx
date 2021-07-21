import * as React from 'react';
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { Link } from 'react-router-dom';
import { Clock } from 'react-feather';
import { Callout, CalloutTitle, CalloutText } from '@dataesr/react-dsfr';
import { Badge } from 'react-bootstrap';

import { isToolEnabled } from '../utils';
import { HTTP } from './HTTP';
import { LightHouse } from './LightHouse';
import { Nuclei } from './Nuclei';
import { Owasp } from './Owasp';
import { TestSSL } from './TestSSL';
import { Trackers } from './Trackers';
import { Wappalyzer } from './Wappalyzer';
import { UpdownIo } from './UpdownIo';
import { Dependabot } from './Dependabot';
import { Codescan } from './Codescan';
import { Nmap } from './Nmap';
import { Stats } from './Stats';

import * as styles from './url.cssmodule.scss';

type UrlDetailProps = { url: string; report: UrlReport };

const Anchor = ({ id }: { id: string }) => (
  <div id={id} style={{ marginBottom: 30 }} />
);

const Url: React.FC<UrlDetailProps> = ({ url, report }) => {
  const updateDate = report && report.lhr && report.lhr.fetchTime;
  React.useEffect(() => {
    const hash = document.location.hash.split('#');
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
      <Callout hasInfoIcon={false}>
        <CalloutTitle as="h4">
          <a href={url} rel="noreferrer noopener" target="_blank">
            {url}
          </a>
        </CalloutTitle>
        <CalloutText>
          {report.category && (
            <Link to={`/category/${report.category}`}>
              <Badge className={styles.badge} variant="success">
                {report.category}
              </Badge>
            </Link>
          )}
          {report.tags
            && report.tags.map((tag: string) => (
              <Link key={tag} to={`/tag/${tag}`}>
                <Badge className={styles.badge} variant="info">
                  {tag}
                </Badge>
              </Link>
            ))}
          {updateDate && (
            <>
              <Clock size={12} />
              <span title={updateDate} className={styles.clock}>
                Mise à jour il y a :
                {' '}
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
            src="https://dashlord.incubateur.net/report/aHR0cHM6Ly9hY2Nlc2xpYnJlLmJldGEuZ291di5mcg==/screenshot.jpeg"
          />
        </div>
      </Callout>
      {(isToolEnabled('lighthouse') && report.lhr && (
        <>
          <Anchor id="lighthouse" />
          <LightHouse
            data={report.lhr}
            url={`${__PUBLIC_URL__}/report/${window.btoa(
              url,
            )}/lhr.html`}
          />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('dependabot')
        && report.dependabot
        && report.dependabot.repositories && (
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
            <br />
          </>
      ))
        || null}
      {(isToolEnabled('codescan')
        && report.codescan
        && report.codescan.repositories && (
          <>
            <Anchor id="codescan" />
            {report.codescan.repositories.filter(Boolean).map((repository) => (
              <Codescan key={repository.url} data={repository} url={url} />
            ))}
            <br />
          </>
      ))
        || null}
      {(isToolEnabled('updownio') && report.updownio && (
        <>
          <Anchor id="updownio" />
          <UpdownIo data={report.updownio} url={url} />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('testssl') && report.testssl && (
        <>
          <Anchor id="testssl" />
          <TestSSL
            data={report.testssl}
            url={`${__PUBLIC_URL__}/report/${window.btoa(
              url,
            )}/testssl.html`}
          />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('nmap') && report.nmap && (
        <>
          <Anchor id="nmap" />
          <Nmap
            data={report.nmap}
            url={`${__PUBLIC_URL__}/report/${window.btoa(
              url,
            )}/nmapvuln.html`}
          />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('http') && report.http && (
        <>
          <Anchor id="http" />
          <HTTP data={report.http} />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('thirdparties') && report.thirdparties && (
        <>
          <Anchor id="thirdparties" />
          <Trackers data={report.thirdparties} />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('zap') && report.zap && (
        <>
          <Anchor id="zap" />
          <Owasp
            data={report.zap}
            url={`${__PUBLIC_URL__}/report/${window.btoa(
              url,
            )}/zap.html`}
          />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('nuclei') && report.nuclei && (
        <>
          <Anchor id="nuclei" />
          <Nuclei data={report.nuclei} />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('wappalyzer') && report.wappalyzer && (
        <>
          <Anchor id="wappalyzer" />
          <Wappalyzer data={report.wappalyzer} />
          <br />
        </>
      ))
        || null}
      {(isToolEnabled('stats') && report.stats && (
      <>
        <Anchor id="stats" />
        <Stats data={report.stats} url={url} />
        <br />
      </>
      ))
          || null}
    </>
  );
};

export default Url;
