import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS ITEMS DAS CATEGORIAS QUE PREENCHEM OS BOTOES

export default function useFetchCategoryItems() {
  // const [isLoadingItems, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  // const [items, setItems] = useState([]);
  const [fetchState, setFetchState] = useState({
    isLoadingItems: true,
    OrdinaryDrink: [],
    Cocktail: [],
    Shake: [],
    OtherUnknow: [],
    Cocoa: [] });

  const makeFetchCatItems = async () => {
    const DOZE = 12;
    try {
      console.log('chamou a makeFetch');
      const responseOrdinary = await fetch('https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=Ordinary%20Drink');
      const responseCocktail = await fetch('https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=Cocktail');
      const responseShake = await fetch('https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=Shake');
      const responseOther = await fetch('https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=Other%20/%20Unknown');
      const responseCocoa = await fetch('https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=Cocoa');
      if (!responseOrdinary.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const resultOrdinary = await responseOrdinary.json();
      const resultCocktail = await responseCocktail.json();
      const resultShake = await responseShake.json();
      const resultOther = await responseOther.json();
      const resultCocoa = await responseCocoa.json();
      setFetchState({ ...fetchState,
        OrdinaryDrink: resultOrdinary.drinks.slice(0, DOZE),
        Cocktail: resultCocktail.drinks.slice(0, DOZE),
        Shake: resultShake.drinks.slice(0, DOZE),
        OtherUnknow: resultOther.drinks.slice(0, DOZE),
        Cocoa: resultCocoa.drinks.slice(0, DOZE),
        isLoadingItems: false });
    } catch (error) {
      setErrors(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  return {
    makeFetchCatItems, errors, fetchState,
  };
}
