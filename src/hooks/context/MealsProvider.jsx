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
  useRecipeDetails,
  useRecipeInProgress,
  useSearchBar,
} from '../custom';

export const MealsContext = createContext();

export default function MealsProvider({ children }) {
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
    isLoadingRecDetal,
    recipeDetails,
    getRecipesDetails,
  } = useFetchRecipeDetails();
  const { isDonedRecipe, isRecipeInProgress } = useRecipeDetails(recipeDetails);
  const {
    handleFavorite,
    handleShare,
    clipBoard,
    fillHeart,
  } = useFavorite(recipeDetails);
  const { finishRecipeDone } = useRecipeInProgress(recipeDetails);
  const { allRecipes, clrCatRecipes, searchCategory, showAllcat,
  } = useCategories(makeFetchRecipes, makeFetchCatItems);
  const { dataSearch, handleSearch } = useSearchBar();

  const values = useMemo(
    () => ({
      isLoadingRecipes,
      isLoadingCat,
      isLoadingTypeCat,
      isLoadingRecDetal,
      isRecipeInProgress,
      isDonedRecipe,
      recipes,
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
    }),
    [
      isLoadingRecipes,
      isLoadingCat,
      isLoadingTypeCat,
      isLoadingRecDetal,
      isRecipeInProgress,
      isDonedRecipe,
      recipes,
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
      makeFetchRecipes,
      searchCategory,
      showAllcat,
      makeFetchCat,
      makeFetchSearchRecipes,
      finishRecipeDone,
    ],
  );

  return <MealsContext.Provider value={ values }>{children}</MealsContext.Provider>;
}

MealsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
