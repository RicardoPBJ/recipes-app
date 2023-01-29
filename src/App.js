import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  DoneRecipes,
  Login,
  Drinks,
  FavoriteRecipes,
  Recipes,
  Profile,
  Meals } from './pages';
import './App.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals" component={ Meals } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
