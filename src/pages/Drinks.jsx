import { useContext } from 'react';
import { Header } from '../components';
import DrinkCard from '../components/DrinkCard';
import DrinkCardCategory from '../components/DrinkCardCategory';
import { DrinksContext } from '../hooks/context/DrinksProvider';
import '../styles/MealsAndDrinks.css';

export default function Drinks() {
  const { isLoading,
    isLoadingCat,
    categories,
    fetchState,
    searchCategory,
    showAllMeals,
    recipesExhibitor } = useContext(DrinksContext);

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
          {categories.drinks.slice(0, FIVE)
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
            ? <DrinkCardCategory />
            : <DrinkCard />}
        </div>
      )}

    </div>
  );
}
