import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Cards.css';


function MealCard({ recipesData }) {
  return (
    <div className="card-container">
      {
        recipesData.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
            key={ e.idMeal }
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
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
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
  recipesData: PropTypes
    .arrayOf(PropTypes.shape({
      idMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  recipesData: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default MealCard;
