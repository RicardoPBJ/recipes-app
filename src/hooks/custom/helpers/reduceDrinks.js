export default function reduceDrinks({ drinks: [objDrinks] }) {
  const ingredient = Object.entries(objDrinks)
    .reduce(
      (newArr, [key, value]) => {
        if (value && /stringredient\d+/i.test(key)) {
          return [...newArr, { [key]: value }];
        }

        return newArr;
      },
      [],
    );

  const measure = Object.entries(objDrinks)
    .reduce((newArr, [key, value]) => {
      if (value && /strmeasure\d+/i.test(key)) {
        return [...newArr, { [key]: value }];
      }

      return newArr;
    }, []);

  return {
    idDrink: objDrinks.idDrink,
    category: objDrinks.strCategory,
    type: 'drink',
    nationality: '',
    ingredientAndMeasure: ingredient.reduce((newArr, obj, i) => {
      if (measure[i]) return [...newArr, { ...obj, ...measure[i] }];

      return [...newArr, { ...obj, [`strMeasure${i + 1}`]: '' }];
    }, []),
    drinkThumb: objDrinks.strDrinkThumb,
    drinkName: objDrinks.strDrink,
    instructions: objDrinks.strInstructions,
    categoryAlcool: objDrinks.strAlcoholic,
  };
}
