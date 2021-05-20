import * as React from "react";
import { Cloud, Info } from "react-feather";
import { Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

export const Topbar = () => (
  <Navbar
    variant="dark"
    bg="dark"
    sticky="top"
    expand="lg"
    className="p-0 flex-md-nowrap shadow"
    style={{ justifyContent: 'space-between' }}
  >
    <Link to="/">
      <div
        className="px-3"
        style={{ height: 30, fontSize: "1.3rem", color: "var(--white)" }}
      >
        <Cloud size={16} style={{ marginTop: -5, marginRight: 10 }} />
        DashLord
      </div>
    </Link>
    <Link title="À propos" to="/about" style={{ color: "white", marginRight: 5 }}><Info /></Link>
  </Navbar>
);
