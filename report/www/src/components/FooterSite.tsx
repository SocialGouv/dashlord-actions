import React from "react";

import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

import dashlordConfig from "@/config.json";

export const FooterSite: React.FC = () => {
  //const Logo = dashlordConfig.marianne ? Marianne : () => <div />;
  return (
    <Footer
      classes={{
        logo: (!!dashlordConfig.marianne && "auto") || "hidden",
      }}
      brandTop={dashlordConfig.entity}
      homeLinkProps={{
        href: "/",
        title: "Accueil",
      }}
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
      accessibility="non compliant"
      bottomItems={[headerFooterDisplayItem]}
      contentDescription={dashlordConfig.footer}
      license={dashlordConfig.marianne ? undefined : false}
    />
  );

  /*
    <Footer>
      <FooterTop></FooterTop>
      <FooterBody description="">
        <Logo
          style={{
            display: dashlordConfig.marianne === true ? "block" : "none",
          }}
        >
          {dashlordConfig.entity}
        </Logo>
        {dashlordConfig.operator && (
          <FooterOperator>
            { typeof dashlordConfig.operator.logo === "string" ? (
              <img className="fr-footer__logo" style={{width: "3.5rem"}} src={dashlordConfig.operator.logo} alt={dashlordConfig.operator.name} />
            ) : (
              <img className="fr-footer__logo" style={dashlordConfig.operator.logo.direction === "vertical" ? { maxWidth: "9.0625rem" } : {width: "3.5rem"}} src={dashlordConfig.operator.logo.src} alt={dashlordConfig.operator.name} />
            )}
          </FooterOperator>
        )}
        <FooterBodyItem>
          <div>{dashlordConfig.footer}</div>
        </FooterBodyItem>
      </FooterBody>
      <FooterBottom>
        <FooterLink href="#"></FooterLink>
        <FooterCopy href="#"></FooterCopy>
      </FooterBottom>
    </Footer>
  */
};
