import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DrinksContext } from '../hooks/context/DrinksProvider';

function DrinkCard() {
  const { recipesData } = useContext(DrinksContext);
  // const TWELVE = 12;
  // const drinksRecipesToShow = recipesData.drinks.slice(0, TWELVE);
  return (
    <div>
      {
        recipesData.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idDrink }
          >
            <Link to={ `/drinks/${e.idDrink}` }>
              <img
                style={ { height: '200px' } }
                data-testid={ `${index}-card-img` }
                src={ `${e.strDrinkThumb}` }
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

export default DrinkCard;