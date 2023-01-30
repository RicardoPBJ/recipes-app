/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import DrinkCard from '../components/DrinkCard';
import MealCard from '../components/MealCard';
import useFetchDrinks from '../hooks/custom/useFetchDrinks';
import useFetchMeals from '../hooks/custom/useFetchMeals';
import useFetchMealsCat from '../hooks/custom/useMealsCategory';
import useFetchDrinksCat from '../hooks/custom/useDrinksCategory';

function Recipes({ history: { location: { pathname } } }) {
  const { drinkData, makeFetchDrinks } = useFetchDrinks();
  const { mealData, makeFetchMeals } = useFetchMeals();
  const { mealCategory, makeFetchMealsCat } = useFetchMealsCat();
  const { drinkCategory, makeFetchDrinksCat } = useFetchDrinksCat();
  console.log(pathname);
  const FIVE = 5;

  useEffect(() => {
    if (pathname === '/meals') {
      makeFetchMeals();
      makeFetchMealsCat();
      console.log(mealCategory);
    } else {
      makeFetchDrinks();
      makeFetchDrinksCat();
    }
  }, [pathname]);

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
                    >
                      {e.strCategory}
                    </button>))}
              </div>
              <MealCard mealData={ mealData } />
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
