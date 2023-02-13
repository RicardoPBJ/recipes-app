/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { DrinkCard, Header, Loading } from '../components';
import { DrinksContext } from '../hooks';
import '../styles/MealsAndDrinks.css';

export default function Drinks() {
  const {
    isLoadingRecipes,
    isLoadingCat,
    categories,
    searchCategory,
    showAllcat,
    allRecipes,
    makeFetchRecipes,
    makeFetchCat,
  } = useContext(DrinksContext);

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
              onClick={ searchCategory }
            >
              {e.strCategory}
            </button>
          ))}
        </div>
      )}
      {isLoadingRecipes ? <Loading /> : <DrinkCard />}
    </div>
  );
}
