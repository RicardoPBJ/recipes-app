/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DrinkCardDetails, Loading, MealCardDetails } from '../components';
import { DrinksContext, MealsContext } from '../hooks';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import './css/RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const {
    isLoadingRecDetal,
    isDonedRecipe,
    getRecipesDetails,
    recipeDetails,
    checkDoneRecipes,
    handleFavoriteDrink,
    handleFavoriteMeal,
    handleShare,
    clipBoard,
    fillHeart } = useContext(
    pathname.includes('meals') ? MealsContext : DrinksContext,
  );

  useEffect(() => {
    getRecipesDetails(id);
    checkDoneRecipes(recipeDetails);
  }, []);

  return isLoadingRecDetal ? <Loading />
    : (
      <div>
        {clipBoard.show && <h2>Link copied!</h2>}
        <img
          src={ fillHeart ? blackHeart : whiteHeart }
          alt=""
        />
        {pathname.includes('meals')
          ? <MealCardDetails /> : <DrinkCardDetails />}
        {
          isDonedRecipe && (
            <Link to={ `${pathname}/in-progress` }>
              <Button
                size="lg"
                fixed="bottom"
                data-testid="start-recipe-btn"
                className="start-btn-container"
              >
                Start Recipe
              </Button>
            </Link>
          )
        }
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
          onClick={ pathname.includes('meals')
            ? handleFavoriteMeal
            : handleFavoriteDrink }
          src={ fillHeart ? blackHeart : whiteHeart }
        >
          Favoritar
        </Button>
      </div>
    );
}
