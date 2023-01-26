import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Recipes } from './pages';
import './App.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
      </Switch>
    </div>
  );
}

export default App;
