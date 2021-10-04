import * as React from "react";

import { Container, Alert } from "@dataesr/react-dsfr";

import { Switch, Route, useLocation, useParams } from "react-router-dom";

import { Dashboard } from "./Dashboard";
import { Trends } from "./Trends";
import { Intro } from "./Intro";
import { About } from "./About";
import { WappalyzerDashboard } from "./WappalyzerDashboard";
import Url from "./Url";

const report: DashLordReport = require("./report.json");
const trends: Trends = require("./trends.json");

type CategoryRouteProps = { report: DashLordReport };

// for some reason react-router `:url*` didnt work, use `*` only
interface CategoryParamTypes {
  category: string;
}

const CategoryRoute: React.FC<CategoryRouteProps> = (props) => {
  const params = useParams<CategoryParamTypes>();
  const category = window.decodeURIComponent(params.category);
  const urls = props.report.filter((u) => u.category === category);
  return (
    <>
      <br />
      {urls.length ? (
        <>
          <h3>
            {category} :{urls.length} urls
          </h3>
          <Dashboard report={urls} />
        </>
      ) : (
        <h3>Aucun URL associée</h3>
      )}
    </>
  );
};

interface TagParamTypes {
  tag: string;
}

type TagRouteProps = { report: DashLordReport };

const TagRoute: React.FC<TagRouteProps> = (props) => {
  const params = useParams<TagParamTypes>();
  const tag = window.decodeURIComponent(params.tag);
  const urls = props.report.filter((u) => u.tags && u.tags.includes(tag));
  return (
    <>
      <br />
      <h3>
        {tag} :{urls.length} urls
      </h3>
      <Dashboard report={urls} />
    </>
  );
};

interface UrlParamTypes {
  "0": string;
}

type UrlRouteProps = { report: DashLordReport };

const UrlRoute: React.FC<UrlRouteProps> = (props) => {
  const params = useParams<UrlParamTypes>();
  const url = window.decodeURIComponent(params["0"]);
  const urlData = props.report.find((u) => u.url === url);
  if (!urlData) {
    return (
      <Alert
        type="error"
        title={`Impossible de trouver le rapport pour ${url}`}
      />
    );
  }
  return <Url url={url} report={urlData} />;
};

export const AppContainer = () => {
  const location = useLocation();
  return (
    <Container fluid={location.pathname === "/"}>
      <div role="main" className="fr-my-4w">
        <Switch>
          <Route path="/url/*">
            <UrlRoute report={report} />
          </Route>
          <Route path="/dashboard">
            <Dashboard report={report} />
          </Route>
          <Route path="/trends">
            <Trends trends={trends} />
          </Route>
          <Route path="/category/:category">
            <CategoryRoute report={report} />
          </Route>
          <Route path="/tag/:tag">
            <TagRoute report={report} />
          </Route>
          <Route path="/wappalyzer">
            <WappalyzerDashboard report={report} />
          </Route>
          <Route path="/intro">
            <Intro />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Dashboard report={report} />
          </Route>
        </Switch>
      </div>
    </Container>
  );
};
