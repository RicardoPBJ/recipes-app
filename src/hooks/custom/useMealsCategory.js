import { useState } from 'react';

export default function useFetchMealsCat() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [mealCategory, setMealCategory] = useState([]);

  const makeFetchMealsCat = async (url) => {
    try {
      setIsLoading(true);
      let response;
      if (!url) {
        response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      } else {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`);
      }
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      setMealCategory(result.meals);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchMealsCat, isLoading, errors, mealCategory,
  };
}
