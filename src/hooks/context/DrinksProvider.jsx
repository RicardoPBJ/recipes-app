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
    handleFavoriteDrink,
    handleFavoriteMeal,
    handleShare,
    clipBoard,
    fillHeart } = useFavorite(recipeDetails);
  const { finishRecipeDone } = useRecipeInProgress(recipeDetails);
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
      isLoadingTypeCat,
      isLoadingRecDetal,
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
      handleFavoriteDrink,
      handleFavoriteMeal,
      handleShare,
      handleSearch,
      getRecipesDetails,
      searchCategory,
      makeFetchRecipes,
      makeFetchSearchRecipes,
      showAllcat,
      makeFetchCat,
      finishRecipeDone,
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
