/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DrinkCardDetails, Loading, MealCardDetails } from '../components';
import { DrinksContext, MealsContext } from '../hooks';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './css/RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const {
    isLoadingRecDetal,
    isDonedRecipe,
    getRecipesDetails,
    checkDoneRecipes,
    handleFavorite,
    handleShare,
    clipBoard,
    fillHeart } = useContext(
    pathname.includes('meals') ? MealsContext : DrinksContext,
  );

  useEffect(() => {
    getRecipesDetails(id);
    checkDoneRecipes();
  }, []);

  return isLoadingRecDetal ? <Loading />
    : (
      <div>
        {clipBoard.show && <h2>Link copied!</h2>}
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
        <button
          data-testid="share-btn"
          onClick={ handleShare }
          className="button-svg"
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ handleFavorite }
          className="button-svg"
        >
          <img
            src={ fillHeart ? blackHeart : whiteHeart }
            alt="favorite"
          />
        </button>
      </div>
    );
}
