import * as React from "react";
import { Home, Info, BarChart, Tool, LifeBuoy, GitHub, Search } from "react-feather";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { smallUrl, sortByKey } from "../utils";

type TopbarProps = {
  report: DashLordReport;
};

export const Topbar: React.FC<TopbarProps> = ({ report }) => {
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  return (<Navbar
    variant="dark"
    bg="dark"
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
        <NavDropdown title="Agrégats" id="agregats">
          <NavDropdown.Item as={NavLink} to="/wappalyzer"><Tool size={16} style={{ marginTop: -5, marginRight: 10 }} />Technologies</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/trends"><BarChart size={16} style={{ marginTop: -5, marginRight: 10 }} />Évolutions</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Détails" id="details">
          {sortedReport.map((url) => (
            <NavDropdown.Item key={url.url} as={NavLink} to={`/url/${url.url}`}><Search size={16} style={{ marginTop: -5, marginRight: 5 }} />{smallUrl(url.url)}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link as={NavLink} to="/intro"><LifeBuoy size={16} style={{ marginTop: -5, marginRight: 10 }} />Aide</Nav.Link>
        <Nav.Link as={NavLink} to="/about"><Info size={16} style={{ marginTop: -5, marginRight: 10 }} />À propos</Nav.Link>
        <Nav.Link href="https://github.com/SocialGouv/dashlord"><GitHub size={16} style={{ marginTop: -5, marginRight: 10 }} />Source</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
};
