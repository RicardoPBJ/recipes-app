import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS ITEMS DAS CATEGORIAS QUE PREENCHEM OS BOTOES

export default function useFetchCategoryItems() {
  const [isLoadingItems, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [items, setItems] = useState([]);

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
      setItems(result);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchCatItems, isLoadingItems, errors, items,
  };
}
