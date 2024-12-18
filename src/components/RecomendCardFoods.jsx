/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { MealsContext } from '../hooks';
import Loading from './Loading';
import './css/RecomendCard.css';

function RecomendCardFoods() {
  const { recipes, isLoadingRecipes, makeFetchRecipes } = useContext(MealsContext);
  const SIX = 6;

  useEffect(() => {
    makeFetchRecipes('meals');
  }, []);

  return (
    <div className="custom-scroll recomend-container">
      {
        isLoadingRecipes ? <Loading />
          : (
            recipes.slice(0, SIX).map((e, i) => (
              <div
                key={ `${i + 1}-recommendation-card` }
                data-testid={ `${i}-recommendation-card` }
                className="card"
              >
                Recomended Meal
                <p data-testid={ `${i}-recommendation-title` }>
                  {e.strMeal}
                </p>
                <img
                  src={ `${e.strMealThumb}` }
                  alt={ e.strMeal }
                />
              </div>
            ))
          )
      }

    </div>
  );
}

export default RecomendCardFoods;
