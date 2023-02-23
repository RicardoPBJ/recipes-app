/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useRecipeDetails(recipe) {
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const [isDonedRecipe, setIsDonedRecipe] = useState(false);
  const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));
  const getRecipeInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (getDoneRecipes() && (recipe.idMeal || recipe.idDrink)) {
      setIsDonedRecipe([...getDoneRecipes()]
        .some(({ id, name }) => id === (recipe.idMeal || recipe.idDrink)
          && name === (recipe.mealName || recipe.drinkName)));
    }

    if (getRecipeInProgress() && (recipe.idMeal || recipe.idDrink)) {
      setIsRecipeInProgress(
        Object.keys(
          getRecipeInProgress()[recipe.idMeal ? 'meals' : 'drinks'],
        ).some((id) => id === (recipe.idMeal || recipe.idDrink)),
      );
    }
  }, [recipe]);

  return {
    isRecipeInProgress,
    isDonedRecipe,
  };
}
