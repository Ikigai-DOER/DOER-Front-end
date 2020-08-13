import React from 'react';
import './App.css';
import Profile from "./pages/Profile";
import JobList from "./pages/JobList";
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Main from "./Main";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/site' component={Main}/>
          <Route exact path='/404' component={NotFound}/>

          <Redirect to='/404'/>
        </Switch>
      </Router>
  );
}

export default App;
