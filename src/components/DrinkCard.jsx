import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DrinksContext } from '../hooks';
import Loading from './Loading';
import '../styles/Cards.css';

function DrinkCard() {
  const {
    isLoadingTypeCat,
    recipesForCategory,
    recipes,
    allRecipes,
    clrCatRecipes,
  } = useContext(DrinksContext);

  return isLoadingTypeCat ? <Loading />
    : (
      <div
        className="card-container"
        style={ { height: '80vh' } }
      >
        {
          (allRecipes && !clrCatRecipes ? recipesForCategory : recipes).map(
            ({ idDrink, strDrink, strDrinkThumb }, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ `${idDrink}-${strDrink}-${index + 1}` }
                className="card-item"
              >
                <Link to={ `/drinks/${idDrink}` }>
                  <img
                    style={ { height: '200px' } }
                    data-testid={ `${index}-card-img` }
                    src={ `${strDrinkThumb}` }
                    alt={ strDrink }
                  />
                </Link>
                <p
                  data-testid={ `${index}-card-name` }
                  className="card-text"
                >
                  {strDrink}
                </p>
              </div>
            ),
          )
        }
      </div>
    );
}

export default DrinkCard;
