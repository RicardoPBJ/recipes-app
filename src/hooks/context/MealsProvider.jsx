/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const MealsContext = createContext();

export default function MealsProvider({ children }) {
  const { pathname } = useLocation();
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes(pathname);
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories(pathname);
  const { isLoadingTypeCat, typeCategory, makeFetchCatItems } = useFetchCategoryItems();
  const [allRecipes, setAllRecipes] = useState(false);

  const searchCategory = ({ target: { value } }) => {
    setAllRecipes(true);
    makeFetchCatItems(value, pathname);
  };

  const showAllcat = () => {
    setAllRecipes(false);
  };

  const values = useMemo(
    () => ({
      isLoading,
      isLoadingCat,
      isLoadingTypeCat,
      recipesData,
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
      isLoadingCat,
      isLoadingTypeCat,
      recipesData,
      categories,
      typeCategory,
      allRecipes,
      searchCategory,
      showAllcat,
      makeFetchCat,
    ],
  );

  return <MealsContext.Provider value={ values }>{children}</MealsContext.Provider>;
}

MealsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
