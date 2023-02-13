import React, { useContext } from 'react';
import { DrinksContext } from '../hooks';

function DrinkCardInProgress() {
  const {
    recipeDetails: {
      idDrink,
      drinkName,
      ingredientAndMeasure,
      drinkThumb,
      instructions,
      categoryAlcool } } = useContext(DrinksContext);

  return (
    <div
      key={ idDrink }
    >
      <img
        data-testid="recipe-photo"
        style={ { height: '200px' } }
        src={ drinkThumb }
        alt={ drinkName }
      />
      <p data-testid="instructions">{ instructions }</p>
      <p data-testid="recipe-title">{ drinkName }</p>
      <p data-testid="recipe-category">{ categoryAlcool }</p>
      {ingredientAndMeasure.map((obj, i) => (
        <span
          key={ `ingredient-and-measure-${i + 1}` }
          data-testid={ `${i}-ingredient-name-and-measure` }
        >
          <label
            data-testid={ `${i}-ingredient-step` }
            htmlFor="recipeCheck"
          >
            <span>
              { `${obj[`strIngredient${i + 1}`]}${obj[`strMeasure${i + 1}`]
                ? `: ${obj[`strMeasure${i + 1}`]}` : ''}` }
            </span>
            {' '}
            <input
              type="checkbox"
              name="recipeCheck"
              id=""
            />
          </label>
        </span>))}
    </div>
  );
}

export default DrinkCardInProgress;
