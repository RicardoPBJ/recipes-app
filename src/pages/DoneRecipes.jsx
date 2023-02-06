import React from 'react';
import { Button } from 'react-bootstrap';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  return (
    (
      <div>
        <DoneRecipeCard />
        (
        <Button
          size="lg"
          fixed="top"
          data-testid="filter-by-all-btn"
          // onClick={ handleClick }
        >
          Filter All
        </Button>

        )

        <Button
          size="lg"
          fixed="top"
          data-testid="filter-by-meal-btn"
          // onClick={ handleShare }
        >
          Filter Meals
        </Button>

        <Button
          size="lg"
          fixed="top"
          data-testid="filter-by-drink-btn"
          // onClick={ handleFavoriteMeal }
        >
          Filter Drinks
        </Button>

      </div>
    )
  );
}

export default DoneRecipes;
