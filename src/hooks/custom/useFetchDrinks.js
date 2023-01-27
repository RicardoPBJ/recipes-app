import { useState } from 'react';

export default function useFetchDrinks() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [drinkData, setDrinkData] = useState([]);

  const makeFetchDrinks = async (url) => {
    try {
      setIsLoading(true);
      let response;
      if (!url) {
        response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      } else {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${url}`);
      }
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      setDrinkData(result.drinks);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchDrinks, isLoading, errors, drinkData,
  };
}
