/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo } from 'react';
import propTypes from 'prop-types';
import useCategories from '../custom/useCategories';
import useFavorite from '../custom/useFavorite';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipeDetails from '../custom/useFetchRecipeDetails';
import useFetchRecipes from '../custom/useFetchRecipes';
import useRecipeInProgress from '../custom/useRecipeInProgress';
import useSearchBar from '../custom/useSearchBar';

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
  const {
    handleFavoriteDrink,
    handleFavoriteMeal,
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
      recipes,
      categories,
      recipesForCategory,
      allRecipes,
      recipeDetails,
      clipBoard,
      fillHeart,
      dataSearch,
      clrCatRecipes,
      handleFavoriteDrink,
      handleFavoriteMeal,
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
      recipes,
      categories,
      recipesForCategory,
      allRecipes,
      recipeDetails,
      clipBoard,
      fillHeart,
      dataSearch,
      clrCatRecipes,
      handleFavoriteDrink,
      handleFavoriteMeal,
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
