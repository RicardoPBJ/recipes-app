import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';
import useFetchRecipes from '../hooks/custom/useFetchRecipes';
import useFetchCategories from '../hooks/custom/useFetchCategories';
import useFetchCategoryItems from '../hooks/custom/useFetchCategoryItems';

export default function Meals() {
  const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes();
  const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
  const { fetchState, makeFetchCatItems } = useFetchCategoryItems();
  // const [showCategory, setShowCategory] = useState(false);
  const [recipesExhibitor, setExhibitor] = useState({ showCategory: false,
  });
  const mealsRecipesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const mealsCatUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const FIVE = 5;

  useEffect(() => {
    makeFetchRecipes(mealsRecipesUrl); // pega as receitas gerais de meals //
    makeFetchCat(mealsCatUrl);
  }, []);

  const searchCategory = ({ target }) => {
    makeFetchCatItems(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.value}`);
    setExhibitor({ ...recipesExhibitor,
      showCategory: !recipesExhibitor.showCategory,
    });
  };

  const showAllMeals = () => {
    setExhibitor({ ...recipesExhibitor,
      showCategory: false,
    });
  };
  // console.log(recipesData);
  // console.log(categories);
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
