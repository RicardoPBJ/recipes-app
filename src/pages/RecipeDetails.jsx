import { Button } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { DrinkCardDetails, MealsCardDetails } from '../components';
import { useFavorite, useFetchRecipesDetails } from '../hooks';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import './css/RecipeDetails.css';

export default function RecipeDetails() {
  const {
    location: { pathname },
  } = useHistory();
  const { id } = useParams();
  const {
    recipes,
    isLoading,
  } = useFetchRecipesDetails(pathname, id);
  const {
    handleFavoriteDrink,
    handleFavoriteMeal,
    handleShare,
    fillHeart,
    clipBoard,
  } = useFavorite(id, pathname, recipes);

  return !isLoading && (
    <div>
      {clipBoard.show && <h2>Link copied!</h2>}
      {fillHeart ? (
        <img
          src={ blackHeart }
          alt=""
        />
      ) : (
        <img
          src={ whiteHeart }
          alt=""
        />
      )}
      {pathname.includes('meals')
        ? <MealsCardDetails recipes={ recipes } />
        : <DrinkCardDetails recipes={ recipes } />}
      <Link to={ `${pathname}/in-progress` }>
        <Button
          size="lg"
          fixed="bottom"
          data-testid="start-recipe-btn"
          className="start-btn-container"
        >
          Start Recipe
        </Button>
      </Link>
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
        onClick={ pathname.includes('meals')
          ? handleFavoriteMeal
          : handleFavoriteDrink }
        src={ fillHeart ? blackHeart : whiteHeart }
      >
        Favoritar
      </Button>
    </div>
  );
}
