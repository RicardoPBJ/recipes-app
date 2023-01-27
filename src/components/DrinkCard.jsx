import PropTypes from 'prop-types';
import React from 'react';

export default function DrinkCard({ drinkData }) {
  return (
    <div>
      {
        drinkData.map((e) => (
          <div key={ e.idDrink }>
            <img src={ e.strDrinkThumb } alt={ e.strGlass } />
            <p>{ e.strGlass }</p>
          </div>

        ))
      }
    </div>
  );
}

DrinkCard.propTypes = {
  drinkData: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};
