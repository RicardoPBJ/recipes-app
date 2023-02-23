import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS ITEMS DAS CATEGORIAS QUE PREENCHEM OS BOTOES
export default function useFetchCategoryItems() {
  const [recipesForCategory, setRecipesForCat] = useState([]);
  const [isLoadingTypeCat, setLoandingTypeCat] = useState(false);
  const [errors, setErrors] = useState(null);
  const { pathname } = useLocation();
  const filterMealsUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const filterDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const LIM = 12;

  const makeFetchCatItems = async (value) => {
    try {
      setLoandingTypeCat(true);

      const response = await fetch(
        pathname.includes('meals')
          ? `${filterMealsUrl}${value}`
          : `${filterDrinksUrl}${value}`,
      );

      if (!response.ok) {
        const url = pathname.includes('meals') ? filterMealsUrl : filterDrinksUrl;
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );

        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();

      setRecipesForCat(result[result.meals ? 'meals' : 'drinks'].slice(0, LIM));
    } catch (error) {
      setErrors(error);
    } finally {
      setLoandingTypeCat(false);
    }
  };

  return {
    makeFetchCatItems,
    recipesForCategory,
    isLoadingTypeCat,
    errors,
  };
}
