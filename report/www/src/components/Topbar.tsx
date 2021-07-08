import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Home, Info, BarChart, Tool, LifeBuoy, GitHub } from "react-feather";
import { Nav, Navbar, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { smallUrl, sortByKey } from "../utils";


type TopbarProps = {
  report: DashLordReport;
};

export const Topbar: React.FC<TopbarProps> = ({ report }) => {
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  return (<Navbar
    variant="light"
    bg="light"
    sticky="top"
    expand="lg"
    className="p-0 flex-md-nowrap shadow"
    style={{ justifyContent: 'space-between' }}
    collapseOnSelect
  >
    <Navbar.Brand href="#"><Home size={16} style={{ marginTop: -5, marginRight: 10 }} />DashLord</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav
        className="mr-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Form inline>
          <Form.Label>URL</Form.Label>
          <Form.Control
            as="select"
          >
            <LinkContainer key={`home`} to={`/#`}>
              <option>{``}</option>
            </LinkContainer>
            {sortedReport.map((url) => (
              <LinkContainer key={url.url} to={`/url/${url.url}`}>
                <option>{smallUrl(url.url)}</option>
              </LinkContainer>
            ))}
          </Form.Control>
        </Form>
      </Nav>
      <Nav>
        <Nav.Link key={'wappalyzer'} as={NavLink} to="/wappalyzer"><Tool size={16} style={{ marginTop: -5, marginRight: 10 }} />Technologies</Nav.Link>
        <Nav.Link key={'trends'} as={NavLink} to="/trends"><BarChart size={16} style={{ marginTop: -5, marginRight: 10 }} />Évolutions</Nav.Link>
        <Nav.Link key={'intro'} as={NavLink} to="/intro"><LifeBuoy size={16} style={{ marginTop: -5, marginRight: 10 }} />Aide</Nav.Link>
        <Nav.Link key={'about'} as={NavLink} to="/about"><Info size={16} style={{ marginTop: -5, marginRight: 10 }} />À propos</Nav.Link>
        <Nav.Link key={'source'} href="https://github.com/SocialGouv/dashlord"><GitHub size={16} style={{ marginTop: -5, marginRight: 10 }} />Source</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
};
