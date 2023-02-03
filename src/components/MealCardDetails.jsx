import React from 'react';

function MealCardDetails({ recipes }) {
  const ingredient = Object
    .entries(recipes.details.meals[0]).reduce((newArr, [key, value]) => {
      if (/stringredient\d+/i.test(key) && value) return [...newArr, { [key]: value }];
      return newArr;
    }, []);

  const measure = Object
    .entries(recipes.details.meals[0]).reduce((newArr, [key, value]) => {
      if (/strmeasure\d+/i.test(key) && !/^ /.test(value)) { return [...newArr, { [key]: value }]; }
      return newArr;
    }, []);

  console.log(ingredient);
  console.log(measure);

  return (
    <div
    // data-testid={ `${index}-recipe-card` }
      key={ recipes.details.meals[0].idMeal }
    >
      <img
        data-testid="recipe-photo"
        style={ { height: '200px' } }
        // data-testid={ `${index}-card-img` }
        src={ `${recipes.details.meals[0].strMealThumb}` }
        alt={ recipes.details.meals[0].strMeal }
      />
      <p data-testid="recipe-title">{ recipes.details.meals[0].strMeal }</p>
      <p data-testid="recipe-category">{recipes.details.meals[0].strCategory}</p>

      {/* <p
        key={ `${index}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {}
      </p> */}

    </div>
  );
}

export default MealCardDetails;

// const measures = Object.entries(details.meals[0]).reduce((newArr, [key, value]) => {

//   if (/strmeasure\d+/i.test(key) && !/^ /.test(value))
//     return [...newArr, { [key]: value }];

//   return newArr;
// }, []);

// const ingredients = Object.entries(details.meals[0]).reduce((newArr, [key, value]) => {
//   if (/stringredient\d+/i.test(key) && value) return [...newArr, { [key]: value }];

//   return newArr;
// }, []);
