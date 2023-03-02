import React, { ReactChildren } from "react";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
import uniq from "lodash.uniq";
import {
  Header,
  HeaderBody,
  Logo as Marianne,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
  HeaderNav,
  NavItem,
  NavSubItem,
} from "@dataesr/react-dsfr";
import { smallUrl, slugifyUrl, sortByKey } from "../utils";

const dashlordConfig: DashlordConfig = require("../config.json");

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
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category)
  ).sort() as string[];
  const tags = uniq(
    sortedReport.filter((u) => u.category).flatMap((u) => u.tags)
  ).sort() as string[];
  const Logo = dashlordConfig.marianne ? Marianne : () => <div />;
  return (
    <>
      <Header>
        <HeaderBody>
          <Logo asLink={<TitleLink href="/" />} splitCharacter={10}>
            {dashlordConfig.entity}
          </Logo>
          <Service
            asLink={<TitleLink href="/" />}
            title={dashlordConfig.title}
            description={dashlordConfig.description}
          />
          <Tool closeButtonLabel="fermer">
            <ToolItemGroup>
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
          {(tags.length > 1 && (
            <NavItem title="Tags">
              {tags.map((tag) => (
                <NavSubItem
                  key={tag}
                  asLink={<NavLink href={`/tag/${tag}`} />}
                  title={tag}
                />
              ))}
            </NavItem>
          )) ||
            null}
          <NavItem title="Urls">
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
    </>
  );
};
