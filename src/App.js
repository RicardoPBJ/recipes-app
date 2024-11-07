import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  DoneRecipes,
  Login,
  FavoriteRecipes,
  RecipeDetails,
  Recipes,
  RecipeInProgress } from './pages';
import { MealsProvider, DrinksProvider } from './hooks';
import './styles/App.css';

function App() {
  return (
    <div className="init">
      <Helmet>
        <title>Recipes</title>
      </Helmet>
      <MealsProvider>
        <DrinksProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route exact path="/meals/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </DrinksProvider>
      </MealsProvider>
    </div>
  );
}

export default App;
