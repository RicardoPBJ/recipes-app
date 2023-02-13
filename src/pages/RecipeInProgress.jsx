/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { Loading, DrinkCardInProgress, MealCardInProgress } from '../components';
import { DrinksContext, MealsContext } from '../hooks';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const {
    isLoadingRecDetal,
    getRecipesDetails,
    finishRecipeDone,
    handleShare,
    handleFavoriteMeal,
  } = useContext(pathname.includes('/meals') ? MealsContext : DrinksContext);

  useEffect(() => {
    getRecipesDetails(id);
  }, []);

  return isLoadingRecDetal ? (
    <Loading />
  ) : (
    <div>
      {pathname.includes('meals') ? (
        <MealCardInProgress />
      ) : (
        <DrinkCardInProgress />
      )}
      <Button
        size="lg"
        fixed="bottom"
        data-testid="finish-recipe-btn"
        className="start-btn-container"
        onClick={ finishRecipeDone }
      >
        Finish Recipe
      </Button>
      <Button
        size="lg"
        fixed="top"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Compartilhar
      </Button>
      <Button
        size="lg"
        fixed="top"
        data-testid="favorite-btn"
        onClick={ handleFavoriteMeal }
      >
        Favoritar
      </Button>
    </div>
  );
}
