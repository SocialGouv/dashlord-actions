import * as React from "react";

import { HashRouter as Router } from "react-router-dom";

import { HeaderSite } from "./components/HeaderSite";
import { FooterSite } from "./components/FooterSite";
import { AppContainer } from "./components/AppContainer";
import { ScrollToTop } from "./components/ScrollToTop";

import "./colors.css";

const report: DashLordReport = require("./report.json");

const App = () => (
  <Router>
    <div>
      <ScrollToTop />
      <HeaderSite report={report} />
      <AppContainer />
      <FooterSite />
    </div>
  </Router>
);

export default App;
