import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import Menu from './Components/Menu';

function App() {
  return (
    <div className="container-fluid" id="test">

    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Menu/>, document.getElementById('test'));

