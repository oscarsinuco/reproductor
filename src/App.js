import React from "react";
import { Reproducir } from "./pages/reproductor/reproductor.js";
import { Switch, Route, HashRouter } from "react-router-dom";
import "./App.css";
// Version <= 2.3.2
import { Home } from "./pages/home/home.js";
function App() {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Route path="/cancion/" component={Reproducir}></Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
