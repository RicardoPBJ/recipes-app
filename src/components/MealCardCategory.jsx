import PropTypes from 'prop-types';
import React from 'react';

function MealCardCategory({ mealCategory }) {
  const TWELVE = 12;
  const mealData12 = mealCategory.slice(0, TWELVE);

  return (
    <div>
      {
        mealData12.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `${e.strMealThumb}/preview` }
              alt={ e.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{ e.strMeal }</p>
          </div>

        ))
      }
    </div>
  );
}

MealCardCategory.propTypes = {
  mealData: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
};

export default MealCardCategory;
