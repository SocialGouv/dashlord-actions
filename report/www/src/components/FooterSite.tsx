import React from "react";

import {
  Footer,
  FooterLink,
  FooterBody,
  FooterTop,
  FooterBodyItem,
  Logo as Marianne,
  FooterBottom,
  FooterCopy,
} from "@dataesr/react-dsfr";
import { FooterOperator } from '@dataesr/react-dsfr';
import dashlordConfig from '@/config.json';


export const FooterSite: React.FC = () => {
  const Logo = dashlordConfig.marianne ? Marianne : () => <div />;
  return (
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
  );
};
