import React from 'react';

export default function MealCard({ mealData }) {
  console.log('comida nhami nhami', mealData);
  return (
    <div>
      {
        mealData.map((e) => (
          <div key={ e.idMeal }>
            <img src={ e.strMealThumb } alt={ e.strMeal } />
            <p>{ e.strMeal }</p>
          </div>

        ))
      }
    </div>
  );
}
