import PropTypes from 'prop-types';
import React from 'react';

function MealCard({ mealData }) {
  console.log('comida nhami nhami', mealData);
  return (
    <div>
      {
        mealData.map((e) => (
          <div key={ e.idMeal }>
            <img src={ e.strMealThumb } alt={ e.strMeal } />
            <p>{ e.strMeal }</p>
          </div>

        ))
      }
    </div>
  );
}

MealCard.propTypes = {
  mealData: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default MealCard;
