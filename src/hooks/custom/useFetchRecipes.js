import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DE RECEITAS ALEATORIAS (MEALS OR DRINKS)

export default function useFetchRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [recipesData, SetRecipesData] = useState([]);
  const mealsRecipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const LIM = 12;

  const makeFetchRecipes = async (path) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        path.includes('meals') ? mealsRecipesUrl : drinksRecipesUrl,
      );
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();

      SetRecipesData(result[result.meals ? 'meals' : 'drinks'].slice(0, LIM));
    } catch (error) {
      setErrors(error);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchRecipes, isLoading, errors, recipesData,
  };
}
