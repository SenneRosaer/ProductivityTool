
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import Menu from './Components/Menu';

function App() {
  return (
    <div>
      <nav class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              Kanban
            </a>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              Lists
            </a>
          </li>
        
        </ul>
      </nav>
      <main>
      <div className="container-fluid" id="test">

      </div>
      </main>
    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Menu/>, document.getElementById('test'));
serviceWorker.unregister();
