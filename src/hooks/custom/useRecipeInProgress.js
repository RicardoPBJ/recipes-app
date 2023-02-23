import { useHistory, useLocation } from 'react-router-dom';

export default function useRecipeInProgress(recipes) {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'));

  function finishRecipeDone() {
    const TEN = 10;
    const newRecipeDone = {
      id: recipes.idMeal || recipes.idDrink,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: recipes.nationality || '',
      category: recipes.category || '',
      name: recipes.mealName || recipes.drinkName,
      image: recipes.mealThumb || recipes.drinkThumb,
      alcoholicOrNot: recipes.categoryAlcool || '',
      doneDate: new Date().toJSON().slice(0, TEN),
      tags: recipes.tags ? recipes.tags.split(',', 2) : [],
    };

    if (!getDoneRecipes()) {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipeDone]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [...getDoneRecipes(), newRecipeDone],
      ));
    }

    push('/done-recipes');
  }

  return {
    finishRecipeDone,
  };
}
