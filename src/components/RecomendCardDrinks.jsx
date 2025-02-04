/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DrinksContext } from '../hooks';
import Loading from './Loading';
import './css/RecomendCard.css';

function RecomendCardDrinks() {
  const {
    recipes,
    isLoadingRecipes,
    allRecipes,
    recipesForCategory,
    clrCatRecipes } = useContext(DrinksContext);
  const SIX = 6;

  return (
    <div className="recomend-container custom-scroll d-flex">
      {
        isLoadingRecipes ? <Loading />
          : (
            (allRecipes && !clrCatRecipes ? recipesForCategory : recipes).slice(0, SIX)
              .map(({ idDrink, strDrink, strDrinkThumb }, i) => (
                <Link
                  to={ `/drinks/${idDrink}` }
                  key={ `${idDrink}` }
                >
                  <div
                    key={ `${i + 1}-recommendation-card` }
                    data-testid={ `${i}-recommendation-card` }
                  >
                    Recomended Meal
                    <p data-testid={ `${i}-recommendation-title` }>
                      {strDrink}
                    </p>
                    <img
                      src={ `${strDrinkThumb}` }
                      alt={ strDrink }
                    />
                  </div>
                </Link>
              ))
          )
      }
    </div>
  );
}

export default RecomendCardDrinks;
