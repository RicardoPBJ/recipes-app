import React from 'react';
import propTypes from 'prop-types';
import RecomendCardDrinks from './RecomendCardDrinks';

function MealCardDetails(
  {
    recipes: {
      idMeal,
      mealThumb,
      ingredientAndMeasure,
      mealName,
      instructions,
      category,
      linkYoutube,
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
        <iframe
          src={ linkYoutube }
          title="video"
          width="400"
          height="300"
          data-testid="video"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p data-testid="instructions">{instructions}</p>
        <p data-testid="recipe-title">{mealName}</p>
        <p data-testid="recipe-category">{category}</p>
        {ingredientAndMeasure.map((obj, i) => (
          <span
            key={ `ingredient-and-measure-${i + 1}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${obj[`strIngredient${i + 1}`]}: ${obj[`strMeasure${i + 1}`]}`}
          </span>))}
        <div>
          <RecomendCardDrinks />
        </div>
      </div>

    </div>
  );
}

MealCardDetails.propTypes = {
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

export default MealCardDetails;
