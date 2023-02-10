import React from 'react';
import propTypes from 'prop-types';
import RecomendCardFoods from './RecomendCardFoods';

function DrinkCardDetails(
  {
    recipes: {
      idDrink,
      drinkName,
      ingredientAndMeasure,
      drinkThumb,
      instructions,
      categoryAlcool,
    },
  },
) {
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
          {`${obj[`strIngredient${i + 1}`]}: ${obj[`strMeasure${i + 1}`]}`}
        </span>))}
      <RecomendCardFoods />
    </div>
  );
}

DrinkCardDetails.propTypes = {
  recipes: propTypes.shape({
    idDrink: propTypes.string.isRequired,
    drinkThumb: propTypes.string.isRequired,
    ingredientAndMeasure: propTypes.arrayOf(
      propTypes.object.isRequired,
    ).isRequired,
    drinkName: propTypes.string.isRequired,
    instructions: propTypes.string.isRequired,
    categoryAlcool: propTypes.string.isRequired,
  }).isRequired,
};
export default DrinkCardDetails;
