import React from 'react';
import propTypes from 'prop-types';

function DrinkCardInProgress(
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
          <label
            data-testid={ `${i}-ingredient-step` }
            htmlFor="recipeCheck"
          >
            <span>
              `$
              {obj[`strIngredient${i + 1}`]}
              : $
              {obj[`strMeasure${i + 1}`]}
              `
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

DrinkCardInProgress.propTypes = {
  recipes: propTypes.shape({
    idDrink: propTypes.string.isRequired,
    drinkThumb: propTypes.string.isRequired,
    ingredientAndMeasure: propTypes.arrayOf(
      propTypes.object.isRequired,
    ).isRequired,
    drinkName: propTypes.string.isRequired,
    instructions: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    categoryAlcool: propTypes.string.isRequired,
    linkYoutube: propTypes.string.isRequired,
  }).isRequired,
};
export default DrinkCardInProgress;
