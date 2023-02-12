/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { DrinkCard, Header, Loading } from '../components';
import { DrinksContext } from '../hooks';
import '../styles/MealsAndDrinks.css';

export default function Drinks() {
  const { isLoading,
    isLoadingCat,
    categories,
    searchCategory,
    showAllcat,
    allRecipes,
    makeFetchRecipes,
    makeFetchCat } = useContext(DrinksContext);

  useEffect(() => {
    makeFetchCat();
    makeFetchRecipes();
  }, []);

  return (
    <div className="page-container">
      {isLoadingCat ? (
        <Loading />
      ) : (
        <div className="space-button">
          <Header />
          {allRecipes && (
            <button
              onClick={ showAllcat }
              type="button"
              data-testid="All-category-filter"
            >
              All
            </button>
          )}
          {categories.map((e) => (
            <button
              key={ e.strCategory }
              data-testid={ `${e.strCategory}-category-filter` }
              type="button"
              value={ `${e.strCategory}` }
              onClick={ searchCategory }
            >
              {e.strCategory}
            </button>
          ))}
        </div>
      )}
      {isLoading ? <Loading /> : <DrinkCard /> }
    </div>
  );
}
