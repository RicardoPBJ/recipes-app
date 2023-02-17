/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo } from 'react';
import propTypes from 'prop-types';
import {
  useCategories,
  useFavorite,
  useFetchCategories,
  useFetchCategoryItems,
  useFetchRecipeDetails,
  useFetchRecipes,
  useRecipeInProgress,
  useSearchBar,
} from '../custom';

export const DrinksContext = createContext();

export default function DrinksProvider({ children }) {
  const {
    isLoadingRecipes,
    recipes,
    makeFetchRecipes,
    makeFetchSearchRecipes,
  } = useFetchRecipes();
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const {
    isLoadingTypeCat,
    recipesForCategory,
    makeFetchCatItems } = useFetchCategoryItems();
  const {
    getRecipesDetails,
    isLoadingRecDetal,
    recipeDetails } = useFetchRecipeDetails();
  const {
    handleFavorite,
    handleShare,
    clipBoard,
    fillHeart,
  } = useFavorite(recipeDetails);
  const {
    isDonedRecipe,
    finishRecipeDone,
    checkDoneRecipes,
  } = useRecipeInProgress(recipeDetails);
  const { allRecipes,
    clrCatRecipes,
    searchCategory,
    showAllcat,
  } = useCategories(makeFetchRecipes, makeFetchCatItems);
  const { dataSearch, handleSearch } = useSearchBar();

  const values = useMemo(
    () => ({
      isLoadingRecipes,
      recipes,
      isLoadingCat,
      isLoadingTypeCat,
      isLoadingRecDetal,
      isDonedRecipe,
      categories,
      recipesForCategory,
      allRecipes,
      recipeDetails,
      clipBoard,
      fillHeart,
      dataSearch,
      clrCatRecipes,
      handleFavorite,
      handleShare,
      handleSearch,
      getRecipesDetails,
      searchCategory,
      showAllcat,
      makeFetchRecipes,
      makeFetchCat,
      makeFetchSearchRecipes,
      finishRecipeDone,
      checkDoneRecipes,
    }),
    [
      isLoadingRecipes,
      isLoadingTypeCat,
      isLoadingRecDetal,
      isDonedRecipe,
      recipes,
      isLoadingCat,
      categories,
      recipesForCategory,
      allRecipes,
      recipeDetails,
      clipBoard,
      fillHeart,
      dataSearch,
      clrCatRecipes,
      handleFavorite,
      handleShare,
      handleSearch,
      getRecipesDetails,
      searchCategory,
      makeFetchRecipes,
      makeFetchSearchRecipes,
      showAllcat,
      makeFetchCat,
      finishRecipeDone,
      checkDoneRecipes,
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
