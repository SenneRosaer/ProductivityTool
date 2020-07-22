
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import Home from './Components/Home';
import Kanban from './Components/Kanban';
import { BrowserRouter, Route, Router, Switch, Link, NavLink } from 'react-router-dom';
import Lists from './Components/Lists';


import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers/Reducers';
import { Provider } from 'react-redux';
import { persistStore, persistReducer} from 'redux-persist';
import {PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage

}

const persistR = persistReducer(persistConfig, rootReducer)

const store = createStore(persistR, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
