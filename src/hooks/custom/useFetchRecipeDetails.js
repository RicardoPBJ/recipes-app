import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DE RECEITAS ALEATORIAS (MEALS OR DRINKS)

export default function useFetchRecipes() {
  // const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [recipes, SetRecipes] = useState({ details: {},
    isLoadingDetails: true });
  // const DOZE = 12;
  const makeFetchRecipesDetails = async (endpoint) => {
    try {
      // setIsLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${endpoint}`);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url  veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      SetRecipes({ ...recipes,
        details: result,
        isLoadingDetails: false });
      // if (value === 'meals') SetRecipesData(result.meals.slice(0, DOZE));
      // if (value === 'drinks') SetRecipesData(result.drinks.slice(0, DOZE));
    } catch (error) {
      setErrors(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  return {
    makeFetchRecipesDetails, errors, recipes,
  };
}
