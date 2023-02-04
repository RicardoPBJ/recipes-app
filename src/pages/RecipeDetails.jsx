import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DrinkCardDetails } from '../components';
import MealCardDetails from '../components/MealCardDetails';
import { useFetchRecipesDetails } from '../hooks';

export default function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const params = useParams();
  const { recipes, isLoading, getRecipesDetails } = useFetchRecipesDetails(pathname);

  useEffect(() => {
    getRecipesDetails(params.id);
  }, []);

  return (
    pathname.includes('meals')
      ? (
        !isLoading && <MealCardDetails recipes={ recipes } />
      ) : (
        !isLoading && <DrinkCardDetails recipes={ recipes } />
      )
  );
}
