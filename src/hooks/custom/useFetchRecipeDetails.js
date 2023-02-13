/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { reduceDrinks, reduceMeals } from './helpers';

export default function useFetchRecipeDetails() {
  const [errors, setErrors] = useState(null);
  const [recipeDetails, SetRecipeDetails] = useState({});
  const [isLoadingRecDetal, setLoading] = useState(true);
  const { pathname } = useLocation();
  const fetchMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const fetchDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const getFetch = (id) => fetch(
    pathname.includes('meals')
      ? `${fetchMeal}${id}`
      : `${fetchDrink}${id}`,
  )
    .then((response) => response.json())
    .catch((error) => setErrors(error));

  const getRecipesDetails = async (id) => {
    setLoading(true);

    const data = await getFetch(id);

    if (data) {
      SetRecipeDetails(
        pathname.includes('meals')
          ? reduceMeals(data)
          : reduceDrinks(data),
      );
    }

    setLoading(false);
  };

  return {
    errors,
    isLoadingRecDetal,
    recipeDetails,
    getRecipesDetails,
  };
}
