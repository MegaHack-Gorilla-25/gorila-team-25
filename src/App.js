import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import LoginRender from './components/login/LoginRender';
import HomePage from "./components/homePage/HomePage";
import ProfileConsultor from './components/ranking/ProfileConsultor';

function App() {
  return (
    <div className="homepage-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/loginRegister" component={LoginRender} />
          <Route exact path="/loged/:firstName/:lastName" component={Dashboard} />
          <Route path="/profile/:name/:porcentageMonth/:porcentageWeek/:porcentageday/:risk/:imagePath" component={ProfileConsultor} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
