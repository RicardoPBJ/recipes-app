import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function useRecipeInProgress(recipes) {
  const [isDonedRecipe, setIsDonedRecipe] = useState(true);
  const { pathname } = useLocation();
  const { push } = useHistory();
  const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));

  function checkDoneRecipes(recipe) {
    if (getDoneRecipes()) {
      setIsDonedRecipe(
        getDoneRecipes().every(
          ({ id, name }) => id !== recipe[recipe.idMeal ? 'idMeal' : 'idDrink']
            && name !== recipe[recipe.mealName ? 'mealName' : 'drinkName'],
        ),
      );
    }
  }

  function finishRecipeDone() {
    const TEN = 10;

    if (pathname.includes('meals')) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          {
            id: recipes.idMeal,
            type: 'meal',
            nationality: recipes.nationality,
            category: recipes.category,
            name: recipes.mealName,
            image: recipes.mealThumb,
            alcoholicOrNot: null,
            doneDate: new Date().toJSON().slice(0, TEN),
            tags: recipes.tags.split(',', 2),
          },
        ]),
      );
    } else {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          {
            id: recipes.idDrink,
            type: 'drink',
            nationality: null,
            category: recipes.category,
            alcoholicOrNot: recipes.categoryAlcool,
            name: recipes.drinkName,
            image: recipes.drinkThumb,
            doneDate: new Date().toJSON().slice(0, TEN),
            tags: [],
          },
        ]),
      );
    }

    push('/done-recipes');
  }

  return {
    isDonedRecipe,
    finishRecipeDone,
    checkDoneRecipes,
  };
}
