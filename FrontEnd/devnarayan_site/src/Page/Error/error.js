import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./error.scss";

function error() {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <div>
        <h2>We can't find that page.</h2>
        <p>
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
        </p>
        <p>We do apologise on it's behalf.</p>
        <div>
          <p>Let's go </p>
          <NavLink style={{ color: "steelblue" }} to="/">
            " Home "
          </NavLink>
          <p> and try from there.</p>
        </div>
      </div>
    </div>
  );
}

export default error;
