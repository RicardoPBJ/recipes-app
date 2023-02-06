import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipeCard() {
  const { storedValue } = useLocalStorage('doneRecipes');

  console.log(storedValue);
  return (
    <div>
      {storedValue
        && storedValue.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ `${index}-${e.id}` }
          >
            <Link to={ `/drinks/${e.id}` }>
              <img
                style={ { height: '150px' } }
                data-testid={ `${index}-horizontal-image` }
                src={ `${e.image}` }
                alt={ e.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-name` }>{ e.name }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {e.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{e.doneDate}</p>
            {e.tags.map((t) => (
              <p
                key={ `${index}-tag` }
                data-testid={ `${index}-${t}-horizontal-tag` }
              >
                {t}

              </p>
            ))}

            <Button
              src={ ShareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share Recipe
            </Button>
          </div>

        ))}
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipesData: PropTypes
    .shape({ drinks: PropTypes
      .arrayOf(PropTypes.objectOf(PropTypes.string)) }).isRequired,

};

export default DoneRecipeCard;
