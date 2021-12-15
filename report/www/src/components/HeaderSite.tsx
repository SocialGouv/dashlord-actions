import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import uniq from "lodash.uniq";
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
} from "@dataesr/react-dsfr";
import { smallUrl, sortByKey } from "../utils";

import dashlordConfig from "../config.json";

type HeaderSiteProps = {
  report: DashLordReport;
};

export const HeaderSite: React.FC<HeaderSiteProps> = ({ report }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category)
  ).sort() as string[];

  return (
    <>
      <Header>
        <HeaderBody>
          {dashlordConfig.marianne === true ? (
            <Logo splitCharacter={10}>{dashlordConfig.entity}</Logo>
          ) : null}
          <Service
            asLink={<RouterLink to="/#" />}
            title={dashlordConfig.title}
            description={dashlordConfig.description}
          />
          <Tool closeButtonLabel="fermer">
            <ToolItemGroup>
              <ToolItem
                icon="ri-github-fill"
                asLink={<a href="https://github.com/SocialGouv/dashlord" />}
              >
                Code source
              </ToolItem>
              <ToolItem onClick={() => setIsOpen(true)}>
                <span
                  className="fr-fi-theme-fill fr-link--icon-left"
                  aria-controls="fr-theme-modal"
                  data-fr-opened={isOpen}
                >
                  Paramètres d’affichage
                </span>
              </ToolItem>
              {dashlordConfig.loginUrl && (
                <ToolItem asLink={<a href={dashlordConfig.loginUrl} />}>
                  <span className="fr-fi-lock-fill fr-link--icon-left">
                    Login
                  </span>
                </ToolItem>
              )}
            </ToolItemGroup>
          </Tool>
        </HeaderBody>
        <HeaderNav>
          <NavItem
            title="Introduction"
            current={location.pathname.startsWith("/intro")}
            asLink={<RouterLink to="/intro" />}
          />
          <NavItem
            title="Dashboard"
            current={location.pathname === "/"}
            asLink={<RouterLink to="/" />}
          />
          {(categories.length > 1 && (
            <NavItem title="Catégories">
              {categories.map((category) => (
                <NavSubItem
                  key={category}
                  current={location.pathname.startsWith(
                    `/category/${category}`
                  )}
                  asLink={<RouterLink to={`/category/${category}`} />}
                  title={category}
                />
              ))}
            </NavItem>
          )) ||
            null}
          <NavItem title="Urls">
            {sortedReport.map((url) => (
              <NavSubItem
                key={url.url}
                current={location.pathname.startsWith(`/url/${url.url}`)}
                asLink={<RouterLink to={`/url/${url.url}`} />}
                title={smallUrl(url.url)}
              />
            ))}
          </NavItem>
          <NavItem
            title="Technologies"
            current={location.pathname.startsWith("/wappalyzer")}
            asLink={<RouterLink to="/wappalyzer" />}
          />
          <NavItem
            title="Evolutions"
            current={location.pathname.startsWith("/trends")}
            asLink={<RouterLink to="/trends" />}
          />
          <NavItem
            title="A propos"
            current={location.pathname.startsWith("/about")}
            asLink={<RouterLink to="/about" />}
          />
        </HeaderNav>
      </Header>
      <SwitchTheme isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
