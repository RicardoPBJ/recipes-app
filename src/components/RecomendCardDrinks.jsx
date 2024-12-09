/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { DrinksContext } from '../hooks';
import Loading from './Loading';
import './css/RecomendCard.css';

function RecomendCardDrinks() {
  const { recipes, isLoadingRecipes, makeFetchRecipes } = useContext(DrinksContext);
  const SIX = 6;

  useEffect(() => {
    makeFetchRecipes('drinks');
  }, []);

  return (
    <div className="recomend-container d-flex">
      {
        isLoadingRecipes ? <Loading />
          : (
            recipes.slice(0, SIX).map((e, i) => (
              <div
                key={ `${i + 1}-recommendation-card` }
                data-testid={ `${i}-recommendation-card` }
              >
                Recomended Meal
                <p data-testid={ `${i}-recommendation-title` }>
                  {e.strDrink}
                </p>
                <img
                  src={ `${e.strDrinkThumb}` }
                  alt={ e.strDrink }
                />
              </div>
            ))
          )
      }
    </div>
  );
}

export default RecomendCardDrinks;
