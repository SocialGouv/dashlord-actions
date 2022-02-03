import React, { ReactChildren, useEffect, useState } from "react";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
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
import { smallUrl, slugifyUrl, sortByKey } from "../utils";

import dashlordConfig from "../config.json";

type HeaderSiteProps = {
  report: DashLordReport;
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children?: ReactChildren;
}) => {
  const router = useRouter();
  const isCurrent = href === router.asPath;
  return (
    <Link href={href} prefetch={false}>
      <a
        className="fr-nav__link"
        {...(isCurrent ? { "aria-current": "page" } : {})}
      >
        {children}
      </a>
    </Link>
  );
};

const TitleLink = ({
  href,
  children,
}: {
  href: string;
  children?: ReactChildren;
}) => {
  return (
    <Link href={href}>
      <a className="fr-header__service-title">{children}</a>
    </Link>
  );
};

export const HeaderSite: React.FC<HeaderSiteProps> = ({ report }) => {
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
            asLink={<TitleLink href="/" />}
            title={dashlordConfig.title}
            description={dashlordConfig.description}
          />
          <Tool closeButtonLabel="fermer">
            <ToolItemGroup>
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
          <NavItem title="Introduction" asLink={<NavLink href="/intro" />} />
          <NavItem title="Dashboard" asLink={<NavLink href="/" />} />
          {(categories.length > 1 && (
            <NavItem title="Catégories">
              {categories.map((category) => (
                <NavSubItem
                  key={category}
                  asLink={<NavLink href={`/category/${category}`} />}
                  title={category}
                />
              ))}
            </NavItem>
          )) ||
            null}
          <NavItem title="Urls" className="pouet">
            {sortedReport.map((url) => (
              <NavSubItem
                key={url.url}
                asLink={
                  <NavLink
                    href={`/url/${encodeURIComponent(slugifyUrl(url.url))}`}
                  />
                }
                title={smallUrl(url.url)}
              />
            ))}
          </NavItem>
          <NavItem
            title="Technologies"
            asLink={<NavLink href="/wappalyzer" />}
          />
          <NavItem title="Evolutions" asLink={<NavLink href="/trends" />} />
          <NavItem title="A propos" asLink={<NavLink href="/about" />} />
        </HeaderNav>
      </Header>
      <SwitchTheme isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
