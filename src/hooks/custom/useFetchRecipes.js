import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DE RECEITAS ALEATORIAS (MEALS OR DRINKS)

export default function useFetchRecipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [recipesData, SetRecipesData] = useState([]);

  const makeFetchRecipes = async (url) => {
    try {
      // setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      SetRecipesData(result);
      console.log('fez o fetchRecipes');
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchRecipes, isLoading, errors, recipesData,
  };
}
