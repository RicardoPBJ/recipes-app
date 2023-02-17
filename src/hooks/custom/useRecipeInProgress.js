import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function useRecipeInProgress(recipes) {
  const [isDonedRecipe, setIsDonedRecipe] = useState(false);
  const { pathname } = useLocation();
  const { push } = useHistory();
  const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));

  function checkDoneRecipes() {
    if (getDoneRecipes()) {
      setIsDonedRecipe(
        getDoneRecipes().every(
          ({ id, name }) => id !== (recipes.idMeal || recipes.idDrink)
            && name !== (recipes.mealName || recipes.drinkName),
        ),
      );
    } else setIsDonedRecipe(true);
  }

  function finishRecipeDone() {
    const TEN = 10;
    const newRecipeDone = {
      id: recipes.idMeal || recipes.idDrink,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: recipes.nationality || null,
      category: recipes.category || '',
      name: recipes.mealName || recipes.drinkName,
      image: recipes.mealThumb || recipes.drinkThumb,
      alcoholicOrNot: recipes.categoryAlcool || null,
      doneDate: new Date().toJSON().slice(0, TEN),
      tags: recipes.tags ? recipes.tags.split(',', 2) : [],
    };

    if (getDoneRecipes()) {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipeDone]));
    }

    push('/done-recipes');
  }

  return {
    isDonedRecipe,
    finishRecipeDone,
    checkDoneRecipes,
  };
}
