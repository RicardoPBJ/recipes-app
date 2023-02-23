/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// HOOK RESPONSAVEL POR FAZER O FETCH DE RECEITAS ALEATORIAS (MEALS OR DRINKS)

export default function useFetchRecipes() {
  const [isLoadingRecipes, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [recipes, SetRecipesData] = useState([]);
  const { pathname } = useLocation();
  const { push } = useHistory();

  async function fetchRecipes(url) {
    const LIM = 12;

    try {
      setIsLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );

        apiError.response = response;
        throw apiError;
      }

      const result = await response.json();

      SetRecipesData(result[result.meals ? 'meals' : 'drinks'].slice(0, LIM));
    } catch (error) {
      setErrors(error);

      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } finally {
      setIsLoading(false);
    }
  }

  const mealsRecipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  function makeFetchRecipes(path = pathname) {
    fetchRecipes(path.includes('meals') ? mealsRecipesUrl : drinksRecipesUrl);
  }

  function makeFetchSearchRecipes({ radioOpt, searchBar }) {
    const mealsIngreUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    const drinksIngreUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

    switch (radioOpt) {
    case 'ingredient':
      fetchRecipes(
        pathname.includes('meals')
          ? `${mealsIngreUrl}${searchBar}`
          : `${drinksIngreUrl}${searchBar}`,
      );
      break;

    case 'name':
      fetchRecipes(
        pathname.includes('meals')
          ? `${mealsRecipesUrl}${searchBar}`
          : `${drinksRecipesUrl}${searchBar}`,
      );
      break;

    case 'firstLetter':
      if (searchBar.length === 1) {
        fetchRecipes(
          pathname.includes('meals')
            ? `${mealsRecipesUrl.replace(/\b[a-z]\b/, 'f')}${searchBar}`
            : `${drinksRecipesUrl.replace(/\b[a-z]\b/, 'f')}${searchBar}`,
        );
      } else global.alert('Your search must have only 1 (one) character');
      break;

    default:
    }
  }

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      push(`${pathname}/${recipes[0].idMeal || recipes[0].idDrink}`);
    }
  }, [recipes]);

  return {
    isLoadingRecipes,
    errors,
    recipes,
    makeFetchRecipes,
    makeFetchSearchRecipes,
  };
}
