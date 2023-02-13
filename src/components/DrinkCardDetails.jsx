import React, { useContext } from 'react';
import { DrinksContext } from '../hooks';
import RecomendCardFoods from './RecomendCardFoods';

function DrinkCardDetails() {
  const {
    recipeDetails: {
      idDrink,
      drinkThumb,
      ingredientAndMeasure,
      drinkName,
      instructions,
      categoryAlcool,
    } } = useContext(DrinksContext);

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
      {(ingredientAndMeasure || []).map((obj, i) => (
        <span
          key={ `ingredient-and-measure-${i + 1}` }
          data-testid={ `${i}-ingredient-name-and-measure` }
        >
          {`${obj[`strIngredient${i + 1}`]}: ${obj[`strMeasure${i + 1}`]}`}
        </span>))}
      <RecomendCardFoods />
    </div>
  );
}

export default DrinkCardDetails;
