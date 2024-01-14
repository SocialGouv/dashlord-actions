import React, { ReactChildren } from "react";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
import uniq from "lodash.uniq";
import {
  Header,
  HeaderBody,
  HeaderOperator,
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
import dashlordConfig from "@/config.json";

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
  const trailingSlash = href.endsWith("/") ? "" : "/";
  const isCurrent = href + trailingSlash === router.asPath;
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
          {dashlordConfig.operator && (
            <HeaderOperator>
              {typeof dashlordConfig.operator.logo === "string" ? (
                <img
                  className="fr-responsive-img"
                  style={{ width: "3.5rem" }}
                  src={dashlordConfig.operator.logo}
                  alt={dashlordConfig.operator.name}
                />
              ) : (
                <img
                  className="fr-responsive-img"
                  style={
                    dashlordConfig.operator.logo.direction === "vertical"
                      ? { maxWidth: "9.0625rem" }
                      : { width: "3.5rem" }
                  }
                  src={dashlordConfig.operator.logo.src}
                  alt={dashlordConfig.operator.name}
                />
              )}
            </HeaderOperator>
          )}
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
          {isToolEnabled("betagouv") && (
            <NavItem title="Startups">
              {sortedReport
                .filter((url) => url.betaId)
                .filter(
                  (url, i, all) =>
                    !all
                      .map((u) => u.betaId)
                      .slice(i + 1)
                      .includes(url.betaId)
                )
                .map((url) => url.betaId)
                .sort()
                .map((id) => {
                  return (
                    <NavSubItem
                      key={id}
                      asLink={<NavLink href={`/startup/${id}`} />}
                      title={id}
                    />
                  );
                })}
            </NavItem>
          )}
          {isToolEnabled("wappalyzer") && (
            <NavItem
              title="Technologies"
              asLink={<NavLink href="/wappalyzer" />}
            />
          )}
          {isToolEnabled("trivy") && (
            <NavItem title="Trivy" asLink={<NavLink href="/trivy" />} />
          )}
          <NavItem title="Évolutions" asLink={<NavLink href="/trends" />} />
          {isToolEnabled("updownio") && (
            <NavItem
              title="Disponibilité"
              asLink={<NavLink href="/updownio" />}
            />
          )}
          <NavItem title="A propos" asLink={<NavLink href="/about" />} />
        </HeaderNav>
      </Header>
    </>
  );
};
