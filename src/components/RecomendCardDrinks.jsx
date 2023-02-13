import React, { useContext } from 'react';
import { DrinksContext } from '../hooks';

function RecomendCardDrinks() {
  const { recipes, isLoading } = useContext(DrinksContext);
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
            {e.strDrink}
          </p>
          <img
            style={ { height: '200px' } }
            src={ `${e.strDrinkThumb}` }
            alt={ e.strDrink }
          />
        </div>
      ))}
    </div>
  );
}

export default RecomendCardDrinks;
