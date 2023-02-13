/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Loading, MealCard } from '../components';
import { MealsContext } from '../hooks';
import '../styles/MealsAndDrinks.css';

export default function Meals() {
  const { pathname } = useLocation();
  const { isLoading,
    isLoadingCat,
    categories,
    searchCategory,
    showAllcat,
    allRecipes,
    makeFetchCat,
    makeFetchRecipes } = useContext(MealsContext);

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
      {isLoading ? <Loading /> : <MealCard />}
    </div>
  );
}
