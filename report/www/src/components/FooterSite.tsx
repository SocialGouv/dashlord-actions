import React from "react";

import {
  Footer,
  FooterLink,
  FooterBody,
  FooterBodyItem,
  Logo,
  FooterBottom,
  FooterCopy,
  Link,
} from "@dataesr/react-dsfr";

import dashlordConfig from "../config.json";

export const FooterSite: React.FC = () => (
  <Footer>
    <FooterBody description="">
      <Logo>{dashlordConfig.entity}</Logo>
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
