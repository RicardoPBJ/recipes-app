/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const DrinksContext = createContext();

export default function DrinksProvider({ children }) {
  const { pathname } = useLocation();
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes(pathname);
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories(pathname);
  const { typeCategory,
    isLoadingTypeCat,
    makeFetchCatItems } = useFetchCategoryItems();
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
      recipesData,
      isLoadingCat,
      isLoadingTypeCat,
      categories,
      typeCategory,
      allRecipes,
      searchCategory,
      showAllcat,
      makeFetchRecipes,
      makeFetchCat,
    }),
    [
      isLoading,
      isLoadingTypeCat,
      recipesData,
      isLoadingCat,
      categories,
      typeCategory,
      allRecipes,
      searchCategory,
      makeFetchRecipes,
      showAllcat,
      makeFetchCat,
    ],
  );

  return (
    <DrinksContext.Provider value={ values }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: propTypes.node.isRequired,
};
