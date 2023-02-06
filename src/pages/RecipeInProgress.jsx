import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import DrinkCardInProgress from '../components/DrinkCardInProgress';
import MealCardInProgress from '../components/MealCardInProgress';
import { useFetchRecipesDetails } from '../hooks';

export default function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const params = useParams();
  const { recipes,
    isLoading, getRecipesDetails } = useFetchRecipesDetails(pathname);

  useEffect(() => {
    getRecipesDetails(params.id);
  }, []);

  const handleClick = () => {
    history.push('/done-recipes');
  };
  return (
    pathname.includes('meals')
      ? (
        !isLoading && (
          <div>
            <MealCardInProgress recipes={ recipes } />
            (
            <Button
              size="lg"
              fixed="bottom"
              data-testid="finish-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Finish Recipe
            </Button>

            )

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              // onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              // onClick={ handleFavoriteMeal }
            >
              Favoritar
            </Button>

          </div>
        )
      ) : (
        !isLoading && (
          <div>
            <DrinkCardInProgress recipes={ recipes } />

            <Button
              size="lg"
              fixed="bottom"
              data-testid="finish-recipe-btn"
              className="start-btn-container"
              onClick={ handleClick }
            >
              Finish Recipe

            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="share-btn"
              // onClick={ handleShare }
            >
              Compartilhar
            </Button>

            <Button
              size="lg"
              fixed="top"
              data-testid="favorite-btn"
              // onClick={ handleFavoriteDrink }
            >
              Favoritar
            </Button>

          </div>
        )
      )
  );
}
