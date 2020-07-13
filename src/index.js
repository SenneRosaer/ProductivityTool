
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import Home from './Components/Home';
import Kanban from './Components/Kanban';
import { BrowserRouter, Route,Router, Switch, Link, NavLink } from 'react-router-dom';
import Lists from './Components/Lists';


function App() {  
  return (
    <div>
      <BrowserRouter>
      <nav class="navbar">
        <ul class="navbar-nav">
        <li class="nav-item">
            <Link to="/" class="nav-link">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/kanban" class="nav-link">
              Kanban
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/lists" class="nav-link">
              Lists
            </Link>
          </li>
          
        
        </ul>
      </nav>
      <main>
          <Switch>
            <Route path="/kanban"> <Kanban/> </Route>
            <Route path="/lists/"> <Lists /> </Route>
            <Route path="/"> <Home /> </Route>
          </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
