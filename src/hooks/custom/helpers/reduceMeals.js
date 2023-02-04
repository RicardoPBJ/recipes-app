export default function reduceMeals(recipes) {
  const embed = 32;
  const ingredient = Object
    .entries(recipes).reduce((newArr, [key, value]) => {
      if (/stringredient\d+/i.test(key) && value) return [...newArr, { [key]: value }];

      return newArr;
    }, []);

  const measure = Object
    .entries(recipes).reduce((newArr, [key, value]) => {
      if (/strmeasure\d+/i.test(key) && !/^ /.test(value)) {
        return [...newArr, { [key]: value }];
      }

      return newArr;
    }, []);

  return {
    idMeal: recipes.idMeal,
    ingredientAndMeasure: ingredient
      .reduce((newArr, obj, i) => [...newArr, { ...obj, ...measure[i] }], []),
    mealThumb: recipes.strMealThumb,
    mealName: recipes.strMeal,
    instructions: recipes.strInstructions,
    category: recipes.strCategory,
    linkYoutube: `https://www.youtube.com/embed/${recipes.strYoutube.slice(embed)}`,
  };
}
