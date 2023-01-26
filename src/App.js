import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages';
import './App.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
