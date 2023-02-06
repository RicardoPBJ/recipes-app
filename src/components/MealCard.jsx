import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Cards.css';

function MealCard({ recipesData }) {
  // const TWELVE = 12;
  // const mealRecipesToShow = recipesData.meals.slice(0, TWELVE);

  return (
    <div className="card-container">
      {
        recipesData.map((e, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ e.idMeal }
            className="card-item"
          >
            <Link to={ `/meals/${e.idMeal}` }>
              <img
                style={ { height: '200px' } }
                data-testid={ `${index}-card-img` }
                src={ `${e.strMealThumb}` }
                alt={ e.strMeal }

              />
            </Link>
            <p
              data-testid={ `${index}-card-name` }
              className="card-text"
            >
              { e.strMeal }
            </p>
          </div>

        ))
      }
    </div>
  );
}

MealCard.propTypes = {
  recipesData: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default MealCard;
