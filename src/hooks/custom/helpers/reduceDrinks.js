export default function reduceDrinks(recipes) {
  const ingredient = Object
    .entries(recipes).reduce((newArr, [key, value]) => {
      if (value && /stringredient\d+/i.test(key)) return [...newArr, { [key]: value }];

      return newArr;
    }, []);

  const measure = Object
    .entries(recipes).reduce((newArr, [key, value]) => {
      if (value && /strmeasure\d+/i.test(key)) {
        return [...newArr, { [key]: value }];
      }

      return newArr;
    }, []);

  return {
    idDrink: recipes.idDrink,
    ingredientAndMeasure: ingredient
      .reduce((newArr, obj, i) => {
        if (measure[i]) return [...newArr, { ...obj, ...measure[i] }];

        return [...newArr, { ...obj, [`strMeasure${i + 1}`]: '' }];
      }, []),
    drinkThumb: recipes.strDrinkThumb,
    drinkName: recipes.strDrink,
    instructions: recipes.strInstructions,
    categoryAlcool: recipes.strAlcoholic,
  };
}
