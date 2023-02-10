import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS ITEMS DAS CATEGORIAS QUE PREENCHEM OS BOTOES
export default function useFetchCategoryItems() {
  const [typeCategory, setTypeCategory] = useState([]);
  const [isLoadingTypeCat, setLoandingTypeCat] = useState(false);
  const [errors, setErrors] = useState(null);
  const filterMealsUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const filterDrinksUrl = 'https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=';
  const LIM = 12;

  const makeFetchCatItems = async (value, path) => {
    try {
      setLoandingTypeCat(true);

      const response = await fetch(
        path.includes('meals')
          ? `${filterMealsUrl}${value}`
          : `${filterDrinksUrl}${value}`,
      );
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();

      setTypeCategory(result[result.meals ? 'meals' : 'drinks'].slice(0, LIM));
    } catch (error) {
      setErrors(error);
    } finally {
      setLoandingTypeCat(false);
    }
  };

  return {
    makeFetchCatItems,
    typeCategory,
    isLoadingTypeCat,
    errors,
  };
}
