import React from 'react';
import propTypes from 'prop-types';
import './css/MealCardInProgress.css';

function MealCardInProgress(
  {
    recipes: {
      idMeal,
      mealThumb,
      ingredientAndMeasure,
      mealName,
      instructions,
      category,

    },
  },
) {
  return (
    <div>
      <div key={ idMeal }>
        <img
          data-testid="recipe-photo"
          style={ { height: '200px' } }
          src={ mealThumb }
          alt={ mealName }
        />

        <p data-testid="instructions">{instructions}</p>
        <p data-testid="recipe-title">{mealName}</p>
        <p data-testid="recipe-category">{category}</p>
        {ingredientAndMeasure.map((obj, i) => (
          <span
            key={ `ingredient-and-measure-${i + 1}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            <label
              className="ingredients-measure"
              data-testid={ `${i}-ingredient-step` }
              htmlFor="recipeCheck"
            >
              <span className="ingredients-measure">
                {`${obj[`strIngredient${i + 1}`]}:
               ${obj[`strMeasure${i + 1}`]}`}

              </span>
              <input
                className="ingredients-measure"
                type="checkbox"
                name="recipeCheck"
                id=""
              />
            </label>
          </span>))}
      </div>

    </div>
  );
}

MealCardInProgress.propTypes = {
  recipes: propTypes.shape({
    idMeal: propTypes.string.isRequired,
    mealThumb: propTypes.string.isRequired,
    ingredientAndMeasure: propTypes.arrayOf(
      propTypes.object.isRequired,
    ).isRequired,
    mealName: propTypes.string.isRequired,
    instructions: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    linkYoutube: propTypes.string.isRequired,
  }).isRequired,
};

export default MealCardInProgress;
