import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import About from "./About";
import AddMovie from "./AddMovie";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add_movie">Add movie</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/about/:id" component={About} />
          <Route path="/add_movie" component={AddMovie} />
        </div>
      </Router>
    );
  }
}

export default App;
