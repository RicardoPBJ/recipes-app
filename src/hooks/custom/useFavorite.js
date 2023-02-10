/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { checkFavorites } from './helpers';

export default function useFavorite(idRecipe, path, recipes) {
  const [clipBoard, setClip] = useState({ copied: '', show: false });
  const [fillHeart, setFillHeart] = useState(false);
  const { hasFav, isFav } = checkFavorites(recipes);
  const getFavs = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

  async function handleShare() {
    const TIME = 4000;
    await navigator.clipboard.writeText(`http://localhost:3000${path}`);

    if (clipBoard.timeoutShow) clearTimeout(clipBoard.timeoutShow);

    setClip({
      copied: path,
      show: true,
      timeoutShow: setTimeout(
        () => setClip({ copied: path, show: false, timeoutShow: null }),
        TIME,
      ),
    });
  }

  function handleFavoriteMeal() {
    const favMeal = {
      id: recipes.idMeal,
      type: 'meal',
      nationality: recipes.nationality,
      category: recipes.category,
      name: recipes.mealName,
      image: recipes.mealThumb,
    };

    if (!getFavs()) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favMeal]));
    } else if (hasFav(getFavs())) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavs(), favMeal]));
    }

    setFillHeart(!fillHeart);
  }

  function handleFavoriteDrink() {
    const favDrink = {
      id: recipes.idDrink,
      type: 'drink',
      nationality: null,
      category: recipes.category,
      alcoholicOrNot: recipes.categoryAlcool,
      name: recipes.drinkName,
      image: recipes.drinkThumb,
    };

    if (!getFavs()) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favDrink]));
    } else if (hasFav(getFavs())) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavs(), favDrink]));
    }

    setFillHeart(!fillHeart);
  }

  useEffect(() => {
    if (getFavs() && Object.entries(recipes).length && isFav(getFavs())) {
      setFillHeart(true);
    }
  }, [recipes]);

  useEffect(() => {
    if (getFavs() && !fillHeart) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        getFavs().filter(
          ({ id, name }) => id !== recipes[recipes.idMeal ? 'idMeal' : 'idDrink']
          && name !== recipes[recipes.mealName ? 'mealName' : 'drinkName'],
        ),
      ));
    }
  }, [fillHeart]);

  return {
    handleFavoriteDrink,
    handleFavoriteMeal,
    handleShare,
    clipBoard,
    fillHeart,
  };
}
