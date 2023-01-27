import React, { useEffect } from 'react';
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
  }, []);

  return (
    <main>
      <DrinkCard drinkData={ drinkData } />
      <MealCard mealData={ mealData } />
      <Footer />
    </main>
  );
}

export default Recipes;
