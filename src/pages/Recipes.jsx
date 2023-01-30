/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import DrinkCard from '../components/DrinkCard';
import MealCard from '../components/MealCard';
import useFetchDrinks from '../hooks/custom/useFetchDrinks';
import useFetchMeals from '../hooks/custom/useFetchMeals';

function Recipes({ history: { location: { pathname } } }) {
  const { drinkData, makeFetchDrinks } = useFetchDrinks();
  const { mealData, makeFetchMeals } = useFetchMeals();
  console.log(pathname);

  useEffect(() => {
    if (pathname === '/meals') {
      makeFetchMeals();
    } else {
      makeFetchDrinks();
    }
  }, [pathname]);

  return (
    <main>
      {
        pathname === '/meals'
          ? (
            <div>
              <MealCard mealData={ mealData } />
              <Footer />
            </div>
          )
          : (
            <div>
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
