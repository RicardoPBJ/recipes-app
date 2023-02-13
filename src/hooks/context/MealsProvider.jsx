/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import useFavorite from '../custom/useFavorite';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipeDetails from '../custom/useFetchRecipeDetails';
import useFetchRecipes from '../custom/useFetchRecipes';
import useRecipeInProgress from '../custom/useRecipeInProgress';

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
    makeFetchCatItems } = useFetchCategoryItems();
  const {
    isLoadingRecDetal,
    recipeDetails,
    getRecipesDetails } = useFetchRecipeDetails();
  const {
    handleFavoriteDrink,
    handleFavoriteMeal,
    handleShare,
    clipBoard,
    fillHeart } = useFavorite(recipeDetails);
  const { finishRecipeDone } = useRecipeInProgress(recipeDetails);
  const [allRecipes, setAllRecipes] = useState(false);
  const [dataSearch, setDataSearch] = useState({ radioOpt: '', searchBar: '' });
  function searchCategory({ target: { value } }) {
    setAllRecipes(true);
    makeFetchCatItems(value);
  }

  function handleSearch({ target: { name, value } }) {
    setDataSearch({
      ...dataSearch,
      [name]: value,
    });
  }

  function showAllcat() {
    setAllRecipes(false);
  }

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
