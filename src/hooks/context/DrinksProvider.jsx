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
  useRecipeDetails,
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
    makeFetchCatItems,
  } = useFetchCategoryItems();
  const {
    getRecipesDetails,
    isLoadingRecDetal,
    recipeDetails,
  } = useFetchRecipeDetails();
  const { isDonedRecipe, isRecipeInProgress } = useRecipeDetails(recipeDetails);
  const {
    handleFavorite,
    handleShare,
    clipBoard,
    fillHeart,
  } = useFavorite(recipeDetails);
  const { finishRecipeDone } = useRecipeInProgress(recipeDetails);
  const {
    allRecipes,
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
      isRecipeInProgress,
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
      finishRecipeDone,
      searchCategory,
      showAllcat,
      makeFetchRecipes,
      makeFetchCat,
      makeFetchSearchRecipes,
    }),
    [
      isLoadingRecipes,
      isLoadingTypeCat,
      isLoadingRecDetal,
      isDonedRecipe,
      isRecipeInProgress,
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
      finishRecipeDone,
      searchCategory,
      makeFetchRecipes,
      makeFetchSearchRecipes,
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
