import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// components
import { Home, Services, Contact } from "./Components";

class Routes extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="row">
            {/* MENU */}
            <nav className="col-12">
              <Link className="btn gsap-btn mr-2" to="/">
                Home
              </Link>
              <Link className="btn gsap-btn mr-2" to="/services">
                Services
              </Link>
              <Link className="btn gsap-btn" to="/contact">
                Contact
              </Link>
            </nav>

            {/* CONTENT */}
            <div className="col-12">
              <Route path="/" exact>
                {({ match }) => <Home show={match !== null} />}
              </Route>

              <Route path="/services">
                {({ match }) => <Services show={match !== null} />}
              </Route>
              <Route path="/contact">
                {({ match }) => <Contact show={match !== null} />}
              </Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
