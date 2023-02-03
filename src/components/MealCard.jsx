import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealCard({ recipesData }) {
  // const TWELVE = 12;
  // const mealRecipesToShow = recipesData.meals.slice(0, TWELVE);

  return (
    <div>
      {
        recipesData.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idMeal }
          >
            <Link to={ `/meals/${e.idMeal}` }>
              <img
                style={ { height: '200px' } }
                data-testid={ `${index}-card-img` }
                src={ `${e.strMealThumb}` }
                alt={ e.strMeal }

              />
            </Link>
            <p data-testid={ `${index}-card-name` }>{ e.strMeal }</p>
          </div>

        ))
      }
    </div>
  );
}

MealCard.propTypes = {
  recipesData: PropTypes
    .shape({ meals: PropTypes
      .arrayOf(PropTypes.objectOf(PropTypes.string)) }).isRequired,

};

export default MealCard;
