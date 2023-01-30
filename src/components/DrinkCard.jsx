import PropTypes from 'prop-types';
import React from 'react';

export default function DrinkCard({ drinkData }) {
  const TWELVE = 12;
  const drinkData12 = drinkData.slice(0, TWELVE);
  return (
    <div>
      {
        drinkData12.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{ e.strDrink }</p>
          </div>

        ))
      }
    </div>
  );
}

DrinkCard.propTypes = {
  drinkData: PropTypes.shape({
    map: PropTypes.func.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
