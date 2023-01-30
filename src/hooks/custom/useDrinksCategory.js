import { useState } from 'react';

export default function useFetchDrinksCat() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [drinkCategory, setDrinkCategory] = useState([]);

  const makeFetchDrinksCat = async (url) => {
    try {
      setIsLoading(true);
      let response;
      if (!url) {
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      } else {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${url}`);
      }
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      setDrinkCategory(result.drinks);
      console.log(result.drinks);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchDrinksCat, isLoading, errors, drinkCategory,
  };
}
