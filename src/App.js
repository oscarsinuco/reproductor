import React from 'react';
import { Reproducir } from './pages/reproductor/reproductor.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
// Version <= 2.3.2
import { Home } from './pages/home/home.js'
function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/cancion/" component={Reproducir}>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
