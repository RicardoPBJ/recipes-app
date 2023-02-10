import { createContext, useMemo, useState } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import propTypes from 'prop-types';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const MealsContext = createContext();

export default function MealsProvider({ children }) {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes();
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { typeCategory, makeFetchCatItems } = useFetchCategoryItems();
  const [allRecipes, setAllRecipes] = useState(false);

  const searchCategory = ({ target: { value } }, path) => {
    makeFetchCatItems(value, path);
    setAllRecipes(true);
  };

  const showAllcat = () => {
    setAllRecipes(false);
  };

  const values = useMemo(
    () => ({
      isLoading,
      recipesData,
      isLoadingCat,
      categories,
      typeCategory,
      allRecipes,
      searchCategory,
      showAllcat,
      makeFetchRecipes,
      makeFetchCat,
    }),
    [
      makeFetchRecipes,
      isLoading,
      recipesData,
      isLoadingCat,
      categories,
      typeCategory,
      allRecipes,
      searchCategory,
      showAllcat,
      makeFetchCat,
    ],
  );

  return (
    <MealsContext.Provider value={ values }>
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
