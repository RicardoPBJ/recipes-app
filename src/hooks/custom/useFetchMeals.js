import { useState } from 'react';

export default function useFetchMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [mealData, setMealData] = useState([]);

  const makeFetchMeals = async (url) => {
    try {
      setIsLoading(true);
      let response;
      if (!url) {
        response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      } else {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${url}`);
      }
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      setMealData(result.meals);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchMeals, isLoading, errors, mealData,
  };
}
