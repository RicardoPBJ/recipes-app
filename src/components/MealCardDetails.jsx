import React, { useContext } from 'react';
import { MealsContext } from '../hooks';
import RecomendCardDrinks from './RecomendCardDrinks';
import './css/MealCardDetails.css';

function MealCardDetails() {
  const {
    recipeDetails: {
      idMeal,
      mealThumb,
      ingredientAndMeasure,
      mealName,
      instructions,
      category,
      linkYoutube,
    } } = useContext(MealsContext);

  return (
    <div>
      <main className="container" key={ idMeal }>
        <section className="container d-flex upper-row">
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            src={ mealThumb }
            alt={ mealName }
          />
          <p data-testid="instructions">{instructions}</p>
          <p data-testid="recipe-title">{mealName}</p>
          <p data-testid="recipe-category">{category}</p>
          {ingredientAndMeasure.map((obj, i) => (
            <span
              key={ `ingredient-and-measure-${i + 1}` }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${obj[`strIngredient${i + 1}`]}: ${obj[`strMeasure${i + 1}`]}`}
            </span>))}
        </section>
        <iframe
          className=""
          src={ linkYoutube }
          title="video"
          width="400"
          height="300"
          data-testid="video"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div>
          <RecomendCardDrinks />
        </div>
      </main>
    </div>
  );
}

export default MealCardDetails;
