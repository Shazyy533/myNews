import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey =process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/general"
              element={<News setProgress={this.setProgress}  key="general" pageSize={25} category="general" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={this.setProgress}  key="sports" apiKey={this.apiKey} pageSize={25} category="sports" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={this.setProgress}  key="science" apiKey={this.apiKey} pageSize={25} category="science" />}
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress}  key="health" apiKey={this.apiKey} pageSize={25} category="health" />}
            />
            <Route
              exact
              path="/technology"
              element={<News setProgress={this.setProgress}  key="technology" apiKey={this.apiKey} pageSize={25} category="technology" />}
            />
            <Route
              exact
              path="/business"
              element={<News setProgress={this.setProgress}  key="business" apiKey={this.apiKey} pageSize={25} category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News setProgress={this.setProgress}  key="entertainment" apiKey={this.apiKey} pageSize={25} category="entertainment" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
