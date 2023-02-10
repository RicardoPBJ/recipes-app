export default function checkFavorites(recipe) {
  const idActual = recipe[recipe.idMeal ? 'idMeal' : 'idDrink'];
  const nameActual = recipe[recipe.mealName ? 'mealName' : 'drinkName'];

  const hasFav = (favs) => favs.every(
    ({ id, name }) => id !== idActual || name !== nameActual,
  );

  const isFav = (favs) => favs.some(
    ({ id, name }) => id === idActual && name === nameActual,
  );

  return {
    hasFav,
    isFav,
  };
}
