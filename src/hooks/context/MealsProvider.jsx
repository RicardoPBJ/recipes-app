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
  const { isLoadingRecipes, recipes, makeFetchRecipes } = useFetchRecipes();
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

  const searchCategory = ({ target: { value } }) => {
    setAllRecipes(true);
    makeFetchCatItems(value);
  };

  const showAllcat = () => {
    setAllRecipes(false);
  };

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
      handleFavoriteDrink,
      handleFavoriteMeal,
      handleShare,
      getRecipesDetails,
      searchCategory,
      showAllcat,
      makeFetchRecipes,
      makeFetchCat,
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
      handleFavoriteDrink,
      handleFavoriteMeal,
      handleShare,
      getRecipesDetails,
      makeFetchRecipes,
      searchCategory,
      showAllcat,
      makeFetchCat,
      finishRecipeDone,
    ],
  );

  return <MealsContext.Provider value={ values }>{children}</MealsContext.Provider>;
}

MealsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
