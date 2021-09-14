import * as React from "react";

import { Container, Alert } from "@dataesr/react-dsfr";

import {
  useParams,
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { HeaderSite } from "./components/HeaderSite";
import { FooterSite } from "./components/FooterSite";
import { Dashboard } from "./components/Dashboard";
import { Trends } from "./components/Trends";
import Url from "./components/Url";
import { Intro } from "./components/Intro";
import { ScrollToTop } from "./components/ScrollToTop";
import { About } from "./components/About";
import { WappalyzerDashboard } from "./components/WappalyzerDashboard";

import "./colors.css";

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
  console.log(urls);
  return (
    <>
      <br />
      {urls.length ? (
        <>
          <h3>
            {category}
{' '}
:{urls.length}
{' '}
urls
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
        {tag}
{' '}
:{urls.length}
{' '}
urls
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

const App = () => (
  <Router>
    <div>
      <ScrollToTop />
      <HeaderSite report={report} />
      <Container>
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
      <FooterSite />
    </div>
  </Router>
);

export default App;
