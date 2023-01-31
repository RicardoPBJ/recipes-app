import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function DrinkCard({ recipesData }) {
  const TWELVE = 12;
  const drinksRecipesToShow = recipesData.drinks.slice(0, TWELVE);
  return (
    <div>
      {
        drinksRecipesToShow.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idDrink }
          >
            <Link to={ `/drinks/${e.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${e.strDrinkThumb}/preview` }
                alt={ e.strDrink }

              />
            </Link>
            <p data-testid={ `${index}-card-name` }>{ e.strDrink }</p>
          </div>

        ))
      }
    </div>
  );
}

DrinkCard.propTypes = {
  recipesData: PropTypes
    .shape({ drinks: PropTypes
      .arrayOf(PropTypes.objectOf(PropTypes.string)) }).isRequired,

};
