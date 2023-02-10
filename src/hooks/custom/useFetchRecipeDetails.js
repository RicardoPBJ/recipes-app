/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { reduceDrinks, reduceMeals } from './helpers';

export default function useFetchRecipes(url, id) {
  const [errors, setErrors] = useState(null);
  const [recipes, SetRecipes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const fetchMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const fetchDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const getFetch = (endpoint) => fetch(
    url.includes('meals')
      ? `${fetchMeal}${endpoint}`
      : `${fetchDrink}${endpoint}`,
  )
    .then((response) => response.json())
    .catch((error) => setErrors(error));

  const getRecipesDetails = async (endpoint) => {
    setLoading(true);

    const data = await getFetch(endpoint);

    if (data) {
      const recipe = url.includes('meals')
        ? reduceMeals(data)
        : reduceDrinks(data);

      SetRecipes(recipe);
    }

    setLoading(false);
  };

  useEffect(() => {
    getRecipesDetails(id);
  }, []);

  return {
    getRecipesDetails,
    errors,
    recipes,
    isLoading,
  };
}
