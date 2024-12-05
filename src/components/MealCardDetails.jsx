import React, { useContext } from 'react';
import { MealsContext } from '../hooks';
// import RecomendCardDrinks from './RecomendCardDrinks';
import './css/MealCardDetails.css';
import './css/AnimatedTitle.css';

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
      <div className="title-container">
        <div className="d-flex align-items-baseline">
          <p className="text-name">name:</p>
          <h1 className="title-anime-name" data-testid="recipe-title">
            {mealName}
          </h1>
        </div>
        <div className="d-flex align-items-baseline">
          <p className="text-name">category:</p>
          <h1
            data-testid="recipe-category"
            className="title-anime-category"
          >
            {category}
          </h1>
        </div>
      </div>
      <main className="detail-container border-default" key={ idMeal }>
        <section className=" d-flex upper-row">
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            src={ mealThumb }
            alt={ mealName }
          />
          <div className="fixed-block">
            <p data-testid="instructions">{instructions}</p>
          </div>
          <div>
            {ingredientAndMeasure.map((obj, i) => (
              <span
                key={ `ingredient-and-measure-${i + 1}` }
                className="ingre-container"
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${obj[`strIngredient${i + 1}`]}: ${obj[`strMeasure${i + 1}`]}`}
              </span>))}
          </div>
        </section>
        <section className="d-flex bottom-row">
          <iframe
            className="ytb-frame"
            src={ linkYoutube }
            title="video"
            width="300"
            height="190"
            data-testid="video"
            allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div>
            {/* <RecomendCardDrinks /> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MealCardDetails;
