import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MealCard({ recipesData }) {
  return (
    <div>
      {
        recipesData.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
          >
            <Link to={ `/meals/${idMeal}` }>
              <img
                style={ { height: '200px' } }
                data-testid={ `${index}-card-img` }
                src={ `${strMealThumb}` }
                alt={ strMeal }

              />
            </Link>
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        ))
      }
    </div>
  );
}

MealCard.propTypes = {
  recipesData: PropTypes
    .arrayOf(PropTypes.shape({
      idMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};

export default MealCard;
