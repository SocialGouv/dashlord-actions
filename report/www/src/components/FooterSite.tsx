import React from 'react';

import {
  Footer,
  FooterLink,
  FooterBody,
  FooterBodyItem,
  Logo,
  FooterBottom,
  FooterCopy,
  Link,
} from '@dataesr/react-dsfr';

export const FooterSite: React.FC = () => {
  return (
  <Footer>
    <FooterBody
      description=""
    >
      <Logo>Ministères sociaux</Logo>
      <FooterBodyItem>
        <Link href="https://beta.gouv.fr">
          beta.gouv.fr
        </Link>
      </FooterBodyItem>
    </FooterBody>
    <FooterBottom>
      <FooterLink href="https://github.com/SocialGouv/dashlord">Code source</FooterLink>
      <FooterCopy href="https://solidarites-sante.gouv.fr">© Ministères Sociaux 2021</FooterCopy>
    </FooterBottom>
  </Footer>
)};