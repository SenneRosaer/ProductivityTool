
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import Home from './Components/Home';
import Kanban from './Components/Kanban';
import { BrowserRouter, Route, Router, Switch, Link, NavLink } from 'react-router-dom';
import Lists from './Components/Lists';


import { createStore } from 'redux';
import reducer from './Reducers/Reducers';
import { Provider } from 'react-redux';
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item navbar-top">
                <Link to="/" className="nav-link">
                  Home
            </Link>
              </li>
              <li className="nav-item navbar-left">
                <Link to="/kanban" className="nav-link">
                  Kanban
            </Link>
              </li>

              <li className="nav-item navbar-left">
                <Link to="/lists" className="nav-link">
                  Lists
            </Link>
              </li>


            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/kanban"> <Kanban /> </Route>
              <Route path="/lists/"> <Lists /> </Route>
              <Route path="/"> <Home /> </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
