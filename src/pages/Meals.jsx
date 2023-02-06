import React, { useContext } from 'react';
import { Header } from '../components';
import MealCard from '../components/MealCard';
import { MealsContext } from '../hooks/context/MealsProvider';
import '../styles/MealsAndDrinks.css';

export default function Meals() {
  const { isLoading,
    recipesData,
    isLoadingCat,
    categories,
    fetchState,
    searchCategory,
    showAllMeals,
    recipesExhibitor } = useContext(MealsContext);

  const FIVE = 5;
  const searchOn = true;

  return (
    <div className="page-container">
      { !isLoadingCat && (
        <div className="space-button">
          <Header searchAppear={ searchOn } />
          {recipesExhibitor.showCategory && (
            <button
              onClick={ showAllMeals }
              type="button"
              data-testid="All-category-filter"
            >
              All
            </button>
          )}
          {categories.meals.slice(0, FIVE)
            .map((e) => (
              <button
                key={ e.strCategory }
                data-testid={ `${e.strCategory}-category-filter` }
                type="button"
                value={ `${e.strCategory}` }
                onClick={ searchCategory }
              >
                {e.strCategory}
              </button>))}
        </div>
      )}

      { !isLoading
      && (
        <div style={ { height: '80vh' } }>
          {recipesExhibitor.showCategory && !fetchState.isLoadingItems
            ? <MealCard recipesData={ fetchState.items } />
            : <MealCard recipesData={ recipesData } />}
        </div>
      )}

    </div>
  );
}
