import React from "react";
import logo from './logo.svg';
import './App.css';
import SeriesList from "./SeriesList";
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="primary" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Button>
      </header>
      <div>
        <h1>EnviroGraph</h1>
        <SeriesList />
      </div>
    </div>
  );
}

export default App;
