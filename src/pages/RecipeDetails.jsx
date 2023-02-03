// import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MealCardDetails from '../components/MealCardDetails';
// import { MealsContext } from '../hooks/context/MealsProvider';
import useFetchRecipeDetails from '../hooks/custom/useFetchRecipeDetails';

export default function RecipeDetails() {
  const { recipes, makeFetchRecipesDetails } = useFetchRecipeDetails();
  // const { recipesData } = useContext(MealsContext);
  const params = useParams();
  // const recipeToshow = recipesDetails.find((e) => e.idMeal === params.id);

  useEffect(() => {
    makeFetchRecipesDetails(params.id);
  }, []);
  console.log(recipes);
  return (
    <div>
      {/* {
        !recipes.isLoadingDetails
      && (
        <div
        // data-testid={ `${index}-recipe-card` }
          key={ recipes.details.meals[0].idMeal }
        >
          <img
            style={ { height: '200px' } }
            // data-testid={ `${index}-card-img` }
            src={ `${recipes.details.meals[0].strMealThumb}` }
            alt={ recipes.details.meals[0].strMeal }
          />
          <p>{ recipes.details.meals[0].strMeal }</p>
        </div>
      )
      } */}
      {!recipes.isLoadingDetails && <MealCardDetails recipes={ recipes } />}

    </div>
  );
}
