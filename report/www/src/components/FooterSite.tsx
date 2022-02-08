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

const dashlordConfig: DashlordConfig = require("../config.json");

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
