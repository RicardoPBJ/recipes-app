/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DrinkCard, Header, Loading } from '../components';
import { DrinksContext } from '../hooks';
import '../styles/MealsAndDrinks.css';

export default function Drinks() {
  const { pathname } = useLocation();
  const { isLoading,
    isLoadingCat,
    categories,
    searchCategory,
    showAllcat,
    allRecipes,
    makeFetchRecipes,
    makeFetchCat } = useContext(DrinksContext);

  useEffect(() => {
    makeFetchCat(pathname);
    makeFetchRecipes(pathname);
  }, []);

  return (
    <div className="page-container">
      {isLoadingCat ? (
        <Loading />
      ) : (
        <div className="space-button">
          <Header searchAppear />
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
              onClick={ (event) => searchCategory(event, pathname) }
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
