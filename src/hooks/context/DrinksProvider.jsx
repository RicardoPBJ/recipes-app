/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const DrinksContext = createContext();

export default function DrinksProvider({ children }) {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes('drinks');
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { fetchState, makeFetchCatItems } = useFetchCategoryItems('drinks');
  const [recipesExhibitor, setExhibitor] = useState({ showCategory: false,
  });
  const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinksCatUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    makeFetchRecipes(drinksRecipesUrl);
    makeFetchCat(drinksCatUrl);
  }, []);

  const searchCategory = ({ target }) => {
    makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${target.value}`);
    setExhibitor({ ...recipesExhibitor,
      showCategory: !recipesExhibitor.showCategory,
    });
  };

  const showAllMeals = () => {
    setExhibitor({ ...recipesExhibitor,
      showCategory: false,
    });
  };

  const values = useMemo(() => ({
    isLoading,
    recipesData,
    isLoadingCat,
    categories,
    fetchState,
    searchCategory,
    showAllMeals,
    recipesExhibitor,
    makeFetchRecipes,
  }), [makeFetchRecipes, isLoading, recipesData, isLoadingCat, categories,
    fetchState, searchCategory, showAllMeals, recipesExhibitor]);

  return (
    <DrinksContext.Provider value={ values }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: propTypes.node.isRequired,
};
