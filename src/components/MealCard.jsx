import PropTypes from 'prop-types';
import React from 'react';

function MealCard({ mealData }) {
  const TWELVE = 12;
  const mealData12 = mealData.slice(0, TWELVE);

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
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{ e.strMeal }</p>
          </div>

        ))
      }
    </div>
  );
}

MealCard.propTypes = {
  mealData: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
};

export default MealCard;
