import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import DrinkCardInProgress from '../components/DrinkCardInProgress';
import MealCardInProgress from '../components/MealCardInProgress';
import { useFetchRecipesDetails } from '../hooks';

export default function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const params = useParams();
  const { recipes, recipeData,
    isLoading, getRecipesDetails } = useFetchRecipesDetails(pathname);
  const TEN = 10;
  useEffect(() => {
    getRecipesDetails(params.id);
  }, []);

  const handleClick = () => {
    if (pathname.includes('meals')) {
      localStorage.setItem('doneRecipes', JSON
        .stringify([
          {
            id: recipeData.meals[0].idMeal,
            type: 'meal',
            nationality: recipeData.meals[0].strArea,
            category: recipeData.meals[0].strCategory,
            alcoholicOrNot: '',
            name: recipeData.meals[0].strMeal,
            image: recipeData.meals[0].strMealThumb,
            doneDate: new Date().toJSON().slice(0, TEN),
            tags: (recipeData.meals[0].strTags).split(',', 2),
          }]));
    }
    if (pathname.includes('drinks')) {
      localStorage.setItem('doneRecipes', JSON
        .stringify([
          {
            id: recipeData.drinks[0].idDrink,
            type: 'drink',
            nationality: recipeData.drinks[0].strArea,
            category: recipeData.drinks[0].strCategory,
            alcoholicOrNot: recipeData.drinks[0].strAlcoholic,
            name: recipeData.drinks[0].strDrink,
            image: recipeData.drinks[0].strDrinkThumb,
            doneDate: new Date().toJSON().slice(0, TEN),
            tags: [],
          }]));
    }
    history.push('/done-recipes');
  };
  return (
    pathname.includes('meals')
      ? (
        !isLoading && (
          <div>
            <MealCardInProgress recipes={ recipes } />
            (
            <Button
              size="lg"
              fixed="bottom"
              data-testid="finish-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Finish Recipe
            </Button>

            )

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              // onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              // onClick={ handleFavoriteMeal }
            >
              Favoritar
            </Button>

          </div>
        )
      ) : (
        !isLoading && (
          <div>
            <DrinkCardInProgress recipes={ recipes } />

            <Button
              size="lg"
              fixed="bottom"
              data-testid="finish-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Finish Recipe

            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              // onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              // onClick={ handleFavoriteDrink }
            >
              Favoritar
            </Button>

          </div>
        )
      )
  );
}
