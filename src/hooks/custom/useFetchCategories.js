import { useState } from 'react';

// HOOK RESPONSAVEL POR FAZER O FETCH DOS NOMES DAS CATEGORIAS QUE PREENCHEM OS BOTOES

export default function useFetchCategories() {
  const [isLoadingCat, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [categories, setCategories] = useState([]);

  const makeFetchCat = async (url) => {
    try {
      // setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }
      const result = await response.json();
      setCategories(result);
      console.log('fez o fetch em categories');
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetchCat, isLoadingCat, errors, categories,
  };
}
