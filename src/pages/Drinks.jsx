import { useContext } from 'react';
import DrinkCard from '../components/DrinkCard';
import DrinkCardCategory from '../components/DrinkCardCategory';
import { DrinksContext } from '../hooks/context/DrinksProvider';

export default function Drinks() {
  const { isLoading,
    isLoadingCat,
    categories,
    fetchState,
    searchCategory,
    showAllMeals,
    recipesExhibitor } = useContext(DrinksContext);

  const FIVE = 5;

  return (
    <div>
      { !isLoadingCat && (
        <div>
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
