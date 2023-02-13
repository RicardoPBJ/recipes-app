/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Header, Loading, MealCard } from '../components';
import { MealsContext } from '../hooks';
import '../styles/MealsAndDrinks.css';

export default function Meals() {
  const {
    isLoadingRecipes,
    isLoadingCat,
    categories,
    searchCategory,
    showAllcat,
    allRecipes,
    makeFetchCat,
    makeFetchRecipes,
  } = useContext(MealsContext);

  useEffect(() => {
    makeFetchCat();
    makeFetchRecipes('meals');
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
      {isLoadingRecipes ? <Loading /> : <MealCard />}
    </div>
  );
}
