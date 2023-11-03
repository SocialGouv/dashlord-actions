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
import { smallUrl, slugifyUrl, sortByKey, isToolEnabled } from "../utils";

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

const CustomHeader = () => <div className="custom-header">
  <img src={dashlordConfig.logo} alt={dashlordConfig.logoAltTxt}/>
  <div className="custom-title">
    <h1>{dashlordConfig.title}</h1>
    <p>{dashlordConfig.description}</p>
  </div>
</div>

const MarianneHeader = () => <div>
  <Marianne asLink={<TitleLink href="/"/>} splitCharacter={10}>{dashlordConfig.entity}</Marianne>
  <Service
    asLink={<TitleLink href="/" />}
    title={dashlordConfig.title}
    description={dashlordConfig.description}
  />
</div>

export const HeaderSite: React.FC<HeaderSiteProps> = ({ report }) => {
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category)
  ).sort() as string[];
  const tags = uniq(
    sortedReport.filter((u) => u.category).flatMap((u) => u.tags)
  ).sort() as string[];
  const ConfigHeader = dashlordConfig.marianne ? MarianneHeader : CustomHeader;
  return (
    <>
      <Header>
        <HeaderBody>
          <ConfigHeader/>
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
          {isToolEnabled("wappalyzer") && (
            <NavItem
              title="Technologies"
              asLink={<NavLink href="/wappalyzer" />}
            />
          )}
          {isToolEnabled("trivy") && (
            <NavItem title="Trivy" asLink={<NavLink href="/trivy" />} />
          )}
          <NavItem title="Evolutions" asLink={<NavLink href="/trends" />} />
          <NavItem title="A propos" asLink={<NavLink href="/about" />} />
        </HeaderNav>
      </Header>
    </>
  );
};
