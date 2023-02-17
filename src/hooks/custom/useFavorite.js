/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { checkFavorites } from './helpers';

export default function useFavorite(recipes) {
  const [clipBoard, setClip] = useState({ copied: '', show: false });
  const [fillHeart, setFillHeart] = useState(false);
  const { pathname } = useLocation();
  const { hasFav, isFav } = checkFavorites(recipes);
  const getFavs = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

  async function handleShare() {
    const TIME = 2500;
    await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);

    const url = await navigator.clipboard.readText();

    if (clipBoard.timeoutShow) clearTimeout(clipBoard.timeoutShow);

    setClip({
      copied: url,
      show: true,
      timeoutShow: setTimeout(
        () => setClip({ copied: url, show: false, timeoutShow: null }),
        TIME,
      ),
    });
  }

  function handleFavorite() {
    const newFav = {
      id: recipes.idMeal || recipes.idDrink,
      name: recipes.mealName || recipes.drinkName,
      type: pathname.includes('meal') ? 'meal' : 'drink',
      nationality: recipes.nationality || '',
      category: recipes.category,
      alcoholicOrNot: recipes.categoryAlcool || '',
      image: recipes.mealThumb || recipes.drinkThumb,
    };

    if (!getFavs()) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFav]));
    } else if (hasFav(getFavs())) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getFavs(), newFav]));
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
          ({ id, name }) => id !== (recipes.idMeal || recipes.idDrink)
          && name !== (recipes.mealName || recipes.drinkName),
        ),
      ));
    }
  }, [fillHeart]);

  return {
    clipBoard,
    fillHeart,
    handleFavorite,
    handleShare,
  };
}
