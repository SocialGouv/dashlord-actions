import React from "react";
import { useRouter } from "next/router";
import uniq from "lodash.uniq";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { symToStr } from "tsafe/symToStr";

import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { createComponentI18nApi } from "@codegouvfr/react-dsfr/i18n";

import dashlordConfig from "@/config.json";
import { sortByKey, isToolEnabled } from "../utils";
import { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation";

type HeaderSiteProps = {
  report: DashLordReport;
};

export const HeaderSite: React.FC<HeaderSiteProps> = ({ report }) => {
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category)
  ).sort() as string[];
  const tags = uniq(
    sortedReport.filter((u) => u.category).flatMap((u) => u.tags)
  ).sort() as string[];
  const router = useRouter();

  const { t } = useTranslation();

  const betaStartups =
    (isToolEnabled("betagouv") &&
      Array.from(
        new Set(
          sortedReport.filter((url) => url.betaId).map((url) => url.betaId)
        )
      ).sort()) ||
    [];

  const views = [
    isToolEnabled("wappalyzer") && {
      linkProps: {
        href: "/wappalyzer",
      },
      text: t("wappalyzer"),
      isActive: router.asPath === "/wappalyzer/",
    },
    isToolEnabled("updownio") && {
      linkProps: {
        href: "/updownio",
      },
      text: t("updownio"),
      isActive: router.asPath === "/updownio/",
    },
    isToolEnabled("declaration-a11y") && {
      linkProps: {
        href: "/summary/accessibility",
      },
      text: t("summary-accessibility"),
      isActive: router.asPath === "/summary/accessibility/",
    },
    isToolEnabled("stats") && {
      linkProps: {
        href: "/summary/stats",
      },
      text: t("summary-stats"),
      isActive: router.asPath === "/summary/stats/",
    },
    isToolEnabled("budget_page") && {
      linkProps: {
        href: "/summary/budget",
      },
      text: t("summary-budget"),
      isActive: router.asPath === "/summary/budget/",
    },
  ].filter(Boolean);

  // @ts-ignore ??? TODO
  const navigation: MainNavigationProps.Item[] = [
    {
      text: t("introduction"),
      linkProps: {
        href: "/intro",
      },
      isActive: router.asPath === "/intro/",
    },
    {
      text: t("dashboard"),
      linkProps: {
        href: "/",
      },
      isActive: router.asPath === "/",
    },
    categories.length > 1 && {
      text: t("categories"),
      menuLinks: [
        ...categories.map((category) => ({
          linkProps: {
            href: `/category/${category}`,
          },
          text: category,
          isActive: router.asPath === `/category/${category}`,
        })),
      ],
      isActive: router.asPath.startsWith("/category/"),
    },
    tags.length > 1 && {
      text: t("tags"),
      menuLinks: [
        ...tags.map((tag) => ({
          linkProps: {
            href: `/tag/${tag}`,
          },
          text: tag,
          isActive: router.asPath === `/tag/${tag}`,
        })),
      ],
      isActive: router.asPath.startsWith("/tag/"),
    },
    betaStartups.length > 1 && {
      text: t("startups"),
      menuLinks: betaStartups.map((startup) => ({
        linkProps: {
          href: `/startup/${startup}`,
        },
        text: startup,
        isActive: router.asPath === `/startup/${startup}`,
      })),
      isActive: router.asPath.startsWith("/startup/"),
    },
    views.length && {
      text: "Vues",
      menuLinks: views,
    },
    {
      text: t("about"),
      linkProps: {
        href: "/about",
      },
      isActive: router.asPath === "/about/",
    },
  ].filter(Boolean);

  return (
    <>
      <Header
        classes={{
          logo: (!!dashlordConfig.marianne && "auto") || "hidden",
        }}
        brandTop={dashlordConfig.entity}
        operatorLogo={
          dashlordConfig.operator &&
          (typeof dashlordConfig.operator.logo === "string"
            ? {
                orientation: "horizontal",
                imgUrl: dashlordConfig.operator.logo,
                alt: `Logo ${dashlordConfig.operator.name}`,
              }
            : {
                orientation: dashlordConfig.operator.logo.direction,
                imgUrl: dashlordConfig.operator.logo.src,
                alt: `Logo ${dashlordConfig.operator.name}`,
              })
        }
        homeLinkProps={{
          href: "/",
          title: dashlordConfig.title,
        }}
        quickAccessItems={[
          dashlordConfig.loginUrl && {
            text: t("login"),
            iconId: "fr-icon-lock-fill",
            linkProps: {
              href: dashlordConfig.loginUrl,
            },
          },
          headerFooterDisplayItem,
        ]}
        navigation={navigation}
        serviceTagline={dashlordConfig.description}
        serviceTitle={dashlordConfig.title}
      />
    </>
  );
};

const { useTranslation, addHeaderSiteTranslations } = createComponentI18nApi({
  componentName: symToStr({ HeaderSite }),
  frMessages: {
    /* spell-checker: disable */
    login: "Se connecter",
    introduction: "Introduction",
    dashboard: "Tableau de bord",
    categories: isToolEnabled("betagouv") ? "Incubateurs" : "Catégories",
    startups: "Startups",
    tags: "Tags",
    wappalyzer: "Technologies (wappalyzer)",
    updownio: "Disponibilité (updown.io)",
    about: "A propos",
    "summary-accessibility": "Récap accessiblité",
    "summary-stats": "Récap Stats",
    "summary-budget": "Récap budget",
  },
});

export { addHeaderSiteTranslations };

HeaderSite.displayName = symToStr({ HeaderSite });
