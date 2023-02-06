import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { DrinkCardDetails } from '../components';
import MealCardDetails from '../components/MealCardDetails';
import { useFetchRecipesDetails } from '../hooks';
import './css/RecipeDetails.css';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const params = useParams();
  const { recipes, recipeData,
    isLoading, getRecipesDetails } = useFetchRecipesDetails(pathname);
  const [clipBoard, setClip] = useState({ show: false,
    copied: '' });
  const [fillHeart, setFillHeart] = useState(false);
  // const favoriteRecipesParsed = JSON
  //   .parse(localStorage.getItem('favoriteRecipes'));
  const isFavorited = () => {
    if (localStorage.favoriteRecipes.includes(params.id)) setFillHeart(true);
  };

  useEffect(() => {
    getRecipesDetails(params.id);
    if (localStorage.favoriteRecipes)isFavorited();
  }, []);

  const handleClick = () => {
    history.push(`${pathname}/in-progress`);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setClip({ ...clipBoard,
      show: true,
      copied: pathname });
  };

  const handleFavoriteMeal = () => {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([
        {
          id: recipeData.meals[0].idMeal,
          type: 'meal',
          nationality: recipeData.meals[0].strArea,
          category: recipeData.meals[0].strCategory,
          alcoholicOrNot: '',
          name: recipeData.meals[0].strMeal,
          image: recipeData.meals[0].strMealThumb,
        }]));
    isFavorited();
  };
  const handleFavoriteDrink = () => {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([
        {
          id: recipeData.drinks[0].idDrink,
          type: 'drink',
          nationality: '',
          category: recipeData.drinks[0].strCategory,
          alcoholicOrNot: recipeData.drinks[0].strAlcoholic,
          name: recipeData.drinks[0].strDrink,
          image: recipeData.drinks[0].strDrinkThumb,
        }]));
  };

  console.log(recipeData);
  return (
    pathname.includes('meals')
      ? (
        !isLoading && (
          <div>
            {clipBoard.show && <h2>Link copied!</h2>}
            {fillHeart ? <img src={ blackHeart } alt="" />
              : <img src={ whiteHeart } alt="" /> }
            <MealCardDetails recipes={ recipes } />

            (
            <Button
              size="lg"
              fixed="bottom"
              data-testid="start-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Start Recipe
            </Button>

            )

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              onClick={ handleFavoriteMeal }
              src={ fillHeart ? blackHeart : whiteHeart }
            >
              Favoritar
            </Button>

          </div>
        )
      ) : (
        !isLoading && (
          <div>
            {clipBoard.show && <h2>Link copied!</h2>}
            {fillHeart ? <img src={ blackHeart } alt="" />
              : <img src={ whiteHeart } alt="" /> }
            <DrinkCardDetails recipes={ recipes } />

            <Button
              size="lg"
              fixed="bottom"
              data-testid="start-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Start Recipe

            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              onClick={ handleFavoriteDrink }
              src={ fillHeart ? blackHeart : whiteHeart }
            >
              Favoritar
            </Button>

          </div>
        )
      )
  );
}
