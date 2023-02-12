import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS NOMES DAS CATEGORIAS QUE PREENCHEM OS BOTOES

export default function useFetchCategories(path) {
  const [isLoadingCat, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [categories, setCategories] = useState([]);
  const mealsCatUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksCatUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const LIM = 5;

  const makeFetchCat = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(path.includes('meals') ? mealsCatUrl : drinksCatUrl);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();

      setCategories(result[result.meals ? 'meals' : 'drinks'].slice(0, LIM));
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchCat,
    isLoadingCat,
    errors,
    categories,
  };
}
