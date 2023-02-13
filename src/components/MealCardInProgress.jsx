import React, { useContext } from 'react';
import { MealsContext } from '../hooks';
import './css/MealCardInProgress.css';

function MealCardInProgress() {
  const {
    recipeDetails: {
      idMeal,
      mealThumb,
      ingredientAndMeasure,
      mealName,
      instructions,
      category } } = useContext(MealsContext);

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
              {' '}
              <input
                className="ingredients-measure"
                type="checkbox"
                name="recipeCheck"
                id=""
              />
            </label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MealCardInProgress;
