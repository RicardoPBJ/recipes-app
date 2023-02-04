import { useState } from 'react';
import { reduceDrinks, reduceMeals } from './helpers';

// HOOK RESPONSAVEL POR FAZER O FETCH DE RECEITAS ALEATORIAS (MEALS OR DRINKS)

export default function useFetchRecipes(url) {
  const [errors, setErrors] = useState(null);
  const [recipes, SetRecipes] = useState({});
  const [isLoading, setLoading] = useState(true);
  // const DOZE = 12;

  const fetchMeal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const fetchDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const getFetch = (endpoint) => fetch(
    url.includes('meals')
      ? `${fetchMeal}${endpoint}`
      : `${fetchDrink}${endpoint}`,
  )
    .then(async (response) => {
      const data = await response.json();

      return data[url.match(/meals|drinks/i)[0]][0];
    })
    .catch((error) => setErrors(error));

  const getRecipesDetails = async (endpoint) => {
    setLoading(true);

    const recipe = url.includes('meals')
      ? reduceMeals(await getFetch(endpoint))
      : reduceDrinks(await getFetch(endpoint));

    SetRecipes(recipe);

    setLoading(false);
    /* try {
      setLoading(true);
      const response = await fetch(url.includes('meals') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${endpoint}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endpoint}`);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      SetRecipes({
        ...recipes,
        details: result,
        isLoadingDetails: false
      });
      // if (value === 'meals') SetRecipesData(result.meals.slice(0, DOZE));
      // if (value === 'drinks') SetRecipesData(result.drinks.slice(0, DOZE));
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    } */
  };

  return {
    getRecipesDetails,
    errors,
    recipes,
    isLoading,
  };
}
