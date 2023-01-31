/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import DrinkCard from '../components/DrinkCard';
import MealCard from '../components/MealCard';
import useFetchDrinks from '../hooks/custom/useFetchDrinks';
import useFetchMeals from '../hooks/custom/useFetchMeals';
import useFetchMealsCat from '../hooks/custom/useMealsCategory';
import useFetchDrinksCat from '../hooks/custom/useDrinksCategory';
import MealCardCategory from '../components/MealCardCategory';

function Recipes({ history: { location: { pathname } } }) {
  const { drinkData, makeFetchDrinks } = useFetchDrinks();
  const { mealData, makeFetchMeals } = useFetchMeals();
  const { mealCategory, makeFetchMealsCat } = useFetchMealsCat();
  const { drinkCategory, makeFetchDrinksCat } = useFetchDrinksCat();
  const [showCategory, setShowCategory] = useState(false);
  console.log(pathname);
  const FIVE = 5;

  // ** quando clica no botão que escolhe a categoria especifica não deveria mudar o path da page ?

  useEffect(() => {
    if (pathname === '/meals') {
      makeFetchMeals(); // pega as 12 receitas gerais //
      makeFetchMealsCat(); // pega os btns //
    } else {
      makeFetchDrinks(); // pega as 12 receitras gerais //
      makeFetchDrinksCat(); // pega os btns //
    }
  }, [pathname]);

  const searchCategory = ({ target }) => {
    makeFetchMealsCat(`filter.php?c=${target.value}`);
    setShowCategory(true);
  };

  return (
    <main>
      {
        pathname === '/meals'
          ? (
            <div>
              <div>
                {mealCategory.slice(0, FIVE)
                  .map((e) => (
                    <button
                      key={ e.strCategory }
                      data-testid={ `${e.strCategory}-category-filter` }
                      type="button"
                      value={ `${e.strCategory}` }
                      onClick={ searchCategory }
                    >
                      {e.strCategory}
                    </button>))}
              </div>
              {showCategory
                ? <div style={ { height: '80vh' } }>
                  <MealCardCategory mealCategory={ mealCategory } />
                </div>
                : <div style={ { height: '80vh' } }>
                  <MealCard mealData={ mealData } />
                </div> }

              <Footer />
            </div>
          )
          : (
            <div>
              <div>
                {drinkCategory.slice(0, FIVE)
                  .map((e) => (
                    <button
                      key={ e.strCategory }
                      data-testid={ `${e.strCategory}-category-filter` }
                      type="button"
                    >
                      {e.strCategory}
                    </button>))}
              </div>
              <DrinkCard drinkData={ drinkData } />
              <Footer />
            </div>
          )
      }

    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    history: PropTypes.number,
    location: PropTypes.string,
  }).isRequired,

};

export default Recipes;
