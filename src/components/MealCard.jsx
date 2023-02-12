import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MealsContext } from '../hooks';
import Loading from './Loading';
import '../styles/Cards.css';

function MealCard() {
  const {
    isLoadingTypeCat,
    typeCategory,
    recipesData,
    allRecipes } = useContext(MealsContext);

  return (
    isLoadingTypeCat ? <Loading />
      : (
        <div
          className="card-container"
          style={ { height: '80vh' } }
        >
          {
            (allRecipes ? typeCategory : recipesData).map(
              ({ idMeal, strMealThumb, strMeal }, index) => (
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ `${idMeal}-${strMeal}-${index + 1}` }
                  className="card-item"
                >
                  <Link to={ `/meals/${idMeal}` }>
                    <img
                      style={ { height: '200px' } }
                      data-testid={ `${index}-card-img` }
                      src={ `${strMealThumb}` }
                      alt={ strMeal }
                    />
                  </Link>
                  <p data-testid={ `${index}-card-name` }>{strMeal}</p>
                </div>
              ),
            )
          }
        </div>
      )
  );
}

export default MealCard;
