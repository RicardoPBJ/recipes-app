import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS ITEMS DAS CATEGORIAS QUE PREENCHEM OS BOTOES
export default function useFetchCategoryItems(value) {
  const DOZE = 12;
  // const [isLoadingItems, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  // const [items, setItems] = useState([]);
  const [fetchState, setFetchState] = useState({
    isLoadingItems: true,
    items: [] });

  const makeFetchCatItems = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      if (value === 'meals') {
        setFetchState({ ...fetchState,
          items: result.meals.slice(0, DOZE),
          isLoadingItems: false });
      }
      if (value === 'drinks') {
        setFetchState({ ...fetchState,
          items: result.drinks.slice(0, DOZE),
          isLoadingItems: false });
      }
    } catch (error) {
      setErrors(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  return {
    makeFetchCatItems, fetchState, errors,
  };
}
