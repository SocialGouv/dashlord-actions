import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import uniq from 'lodash.uniq';
import {
  Header,
  HeaderBody,
  Logo,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
  HeaderNav,
  NavItem,
  NavSubItem,
  SwitchTheme,
} from '@dataesr/react-dsfr';
import { smallUrl, sortByKey } from '../utils';

type HeaderSiteProps = {
  report: DashLordReport;
};

export const HeaderSite: React.FC<HeaderSiteProps> = ({ report }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(() => location.pathname || '');
  const sortedReport = (report && report.sort(sortByKey('url'))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category),
  ).sort() as string[];

  useEffect(() => {
    if (path !== location.pathname) {
      setPath(location.pathname);
    }
  }, [path, setPath, location]);
  return (
    <>
      <Header>
        <HeaderBody>
          <Logo splitCharacter={10}>Ministères sociaux</Logo>
          <Service
            asLink={<RouterLink to="/#" />}
            title="Dashlord"
            description="Pour les scanner tous..."
          />
          <Tool
            closeButtonLabel="fermer"
          >
            <ToolItemGroup>
              <ToolItem icon="ri-github-fill" link="https://github.com/SocialGouv/dashlord">Code source</ToolItem>
              <ToolItem onClick={() => setIsOpen(true)}>
                <span
                  className="fr-fi-theme-fill fr-link--icon-left"
                  aria-controls="fr-theme-modal"
                  data-fr-opened={isOpen}
                >
                  Paramètres d’affichage
                </span>
              </ToolItem>
            </ToolItemGroup>
          </Tool>
        </HeaderBody>
        <HeaderNav path={path}>
          <NavItem
            title="Introduction"
            current={path.startsWith('/intro')}
            asLink={<RouterLink to="/intro" />}
          />
          <NavItem title="Catégories">
            {categories.map((category) => (
              <NavSubItem
                key={category}
                current={path.startsWith(`/tag/${category}`)}
                asLink={<RouterLink to={`/tag/${category}`} />}
                title={category}
              />
            ))}
          </NavItem>
          <NavItem title="Urls">
            {sortedReport.map((url) => (
              <NavSubItem
                key={url.url}
                current={path.startsWith(`/url/${url.url}`)}
                asLink={<RouterLink to={`/url/${url.url}`} />}
                title={smallUrl(url.url)}
              />
            ))}
          </NavItem>
          <NavItem
            title="Technologies"
            current={path.startsWith('/wappalyzer')}
            asLink={<RouterLink to="/wappalyzer" />}
          />
          <NavItem
            title="Evolutions"
            current={path.startsWith('/trends')}
            asLink={<RouterLink to="/trends" />}
          />
          <NavItem
            title="A propos"
            current={path.startsWith('/about')}
            asLink={<RouterLink to="/about" />}
          />
        </HeaderNav>
      </Header>
      <SwitchTheme isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
