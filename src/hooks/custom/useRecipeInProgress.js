import { useHistory, useLocation } from 'react-router-dom';

export default function useRecipeInProgress(recipes) {
  const { pathname } = useLocation();
  const { push } = useHistory();

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
    finishRecipeDone,
  };
}
