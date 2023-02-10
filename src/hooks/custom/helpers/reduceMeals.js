export default function reduceMeals({ meals: [objMeals] }) {
  const embed = 32;
  const ingredient = Object
    .entries(objMeals).reduce((newArr, [key, value]) => {
      if (/stringredient\d+/i.test(key) && value) {
        return [...newArr, { [key]: value }];
      }

      return newArr;
    }, []);

  const measure = Object.entries(objMeals)
    .reduce((newArr, [key, value]) => {
      if (/strmeasure\d+/i.test(key) && !/^ /.test(value)) {
        return [...newArr, { [key]: value }];
      }

      return newArr;
    }, []);

  return {
    idMeal: objMeals.idMeal,
    ingredientAndMeasure: ingredient.reduce(
      (newArr, obj, i) => {
        if (measure[i]) {
          return [...newArr, { ...obj, ...measure[i] }];
        }

        return [...newArr, { ...obj, [`strMeasure${i + 1}`]: '' }];
      },
      [],
    ),
    mealThumb: objMeals.strMealThumb,
    mealName: objMeals.strMeal,
    nationality: objMeals.strArea,
    instructions: objMeals.strInstructions,
    category: objMeals.strCategory,
    linkYoutube: `https://www.youtube.com/embed/${objMeals.strYoutube.slice(embed)}`,
  };
}
