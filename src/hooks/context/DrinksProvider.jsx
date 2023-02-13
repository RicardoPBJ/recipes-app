/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import useFavorite from '../custom/useFavorite';
import useFetchCategories from '../custom/useFetchCategories';
import useFetchCategoryItems from '../custom/useFetchCategoryItems';
import useFetchRecipeDetails from '../custom/useFetchRecipeDetails';
import useFetchRecipes from '../custom/useFetchRecipes';
import useRecipeInProgress from '../custom/useRecipeInProgress';

export const DrinksContext = createContext();

export default function DrinksProvider({ children }) {
  const { isLoadingRecipes, recipes, makeFetchRecipes } = useFetchRecipes();
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
      handleFavoriteDrink,
      handleFavoriteMeal,
      handleShare,
      getRecipesDetails,
      searchCategory,
      makeFetchRecipes,
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
