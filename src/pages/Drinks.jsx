import React, { useEffect, useState } from 'react';
import useFetchRecipes from '../hooks/custom/useFetchRecipes';
import useFetchCategories from '../hooks/custom/useFetchCategories';
import useFetchCategoryItems from '../hooks/custom/useFetchCategoryItems';
import DrinkCard from '../components/DrinkCard';

function Drinks() {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes();
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { isLoadingItems, items, makeFetchCatItems } = useFetchCategoryItems();
  const [showCategory, setShowCategory] = useState(false);
  const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinksCatUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const FIVE = 5;

  useEffect(() => {
    makeFetchRecipes(drinksRecipesUrl); // pega as receitas gerais de meals //
    makeFetchCat(drinksCatUrl);
  }, []);

  const searchCategory = async (categ) => {
    await makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${categ}`);
    setShowCategory(!showCategory);
  };

  const showAllDrinks = () => {
    setShowCategory(false);
  };

  return (
    <div>
      { !isLoadingCat && (
        <div>
          {showCategory && (
            <button
              onClick={ showAllDrinks }
              type="button"
              data-testid="All-category-filter"
            >
              All
            </button>
          )}
          { categories !== [] && categories.drinks.slice(0, FIVE)
            .map((e) => (
              <button
                key={ e.strCategory }
                data-testid={ `${e.strCategory}-category-filter` }
                type="button"
                value={ `${e.strCategory}` }
                onClick={ () => searchCategory(e.strCategory) }
              >
                {e.strCategory}
              </button>))}
        </div>
      )}

      { !isLoading
      && (
        <div style={ { height: '80vh' } }>
          {showCategory && !isLoadingItems ? <DrinkCard recipesData={ items } />
            : <DrinkCard recipesData={ recipesData } />}
        </div>
      )}

    </div>
  );
}

export default Drinks;
