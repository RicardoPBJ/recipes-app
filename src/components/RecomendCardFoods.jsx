import React, { useContext } from 'react';
import { MealsContext } from '../hooks';

function RecomendCardFoods() {
  const { recipes, isLoading } = useContext(MealsContext);
  const SIX = 6;
  const recomended = recipes.slice(0, SIX);
  return (
    <div style={ { height: '200px' } }>
      {!isLoading && recomended.map((e, i) => (
        <div
          key={ `${i + 1}-recommendation-card` }
          data-testid={ `${i}-recommendation-card` }
        >
          Recomended Meal
          <p data-testid={ `${i}-recommendation-title` }>
            {e.strMeal}
          </p>
          <img
            style={ { height: '200px' } }
            src={ `${e.strMealThumb}` }
            alt={ e.strMeal }
          />
        </div>
      ))}

    </div>
  );
}

export default RecomendCardFoods;
