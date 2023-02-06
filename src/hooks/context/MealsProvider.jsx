/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const MealsContext = createContext();

export default function MealsProvider({ children }) {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes('meals');
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { fetchState, makeFetchCatItems } = useFetchCategoryItems('meals');
  const [recipesExhibitor, setExhibitor] = useState({ showCategory: false,
  });
  const mealsRecipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const mealsCatUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    makeFetchRecipes(mealsRecipesUrl);
    makeFetchCat(mealsCatUrl);
  }, []);

  const searchCategory = ({ target }) => {
    makeFetchCatItems(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
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
    <MealsContext.Provider value={ values }>
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
