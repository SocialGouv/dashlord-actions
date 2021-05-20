import * as React from "react";

import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Home, BarChart, Search } from "react-feather";
import uniq from "lodash.uniq";

import { smallUrl, sortByKey, isToolEnabled } from "../utils";

type SidebarProps = {
  report: DashLordReport;
};

export const Sidebar: React.FC<SidebarProps> = ({ report }) => {
  const sortedReport = (report && report.sort(sortByKey("url"))) || [];
  const categories = uniq(
    sortedReport.filter((u) => u.category).map((u) => u.category)
  ).sort() as string[];
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              activeClassName="active"
              exact={true}
            >
              <Home size={16} style={{ marginTop: -5, marginRight: 5 }} />
              Accueil
            </NavLink>
            <NavLink
              to="/intro"
              className="nav-link"
              activeClassName="active"
              exact={true}
            >
              <BarChart size={16} style={{ marginTop: -5, marginRight: 5 }} />
              Introduction
            </NavLink>
          </li>
        </ul>

        {(categories.length > 1 && (
          <React.Fragment>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Catégories</span>
            </h6>
            <ul className="nav flex-column">
              {categories.map((category) => (
                <li
                  className="nav-item"
                  key={category}
                  style={{
                    whiteSpace: "pre",
                  }}
                >
                  <NavLink
                    className="nav-link"
                    to={`/category/${category}`}
                    activeClassName="active"
                    exact={true}
                  >
                    <BarChart
                      size={16}
                      style={{ marginTop: -5, marginRight: 5 }}
                    />
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )) ||
          null}

        {isToolEnabled("wappalyzer") && (
          <div>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Rapports</span>
            </h6>
            <ul className="nav flex-column">
              <li
                className="nav-item"
                style={{
                  whiteSpace: "pre",
                }}
              >
                <NavLink
                  className="nav-link"
                  to={`/wappalyzer`}
                  activeClassName="active"
                  exact={true}
                >
                  <BarChart
                    size={16}
                    style={{ marginTop: -5, marginRight: 5 }}
                  />
                  Technologies
                </NavLink>
              </li>
            </ul>
          </div>
        )||null}

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Urls</span>
        </h6>

        <ul className="nav flex-column">
          {sortedReport.map((url) => (
            <li
              className="nav-item"
              key={url.url}
              style={{
                whiteSpace: "pre",
              }}
            >
              <NavLink
                className="nav-link"
                to={`/url/${url.url}`}
                activeClassName="active"
                exact={true}
              >
                <Search size={16} style={{ marginTop: -5, marginRight: 5 }} />
                {smallUrl(url.url)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Nav>
  );
};
