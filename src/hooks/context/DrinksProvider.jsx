/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipes from '../custom/useFetchRecipes';

export const DrinksContext = createContext();

export default function DrinksProvider({ children }) {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes();
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { typeCategory,
    isLoadingTypeCat,
    makeFetchCatItems } = useFetchCategoryItems();
  const [allRecipes, setAllRecipes] = useState(false);

  const searchCategory = ({ target: { value } }, path) => {
    setAllRecipes(true);
    makeFetchCatItems(value, path);
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
