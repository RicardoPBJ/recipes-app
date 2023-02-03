// import React, { useEffect, useState } from 'react';
// import DrinkCard from '../components/DrinkCard';
// import useFetchRecipes from '../hooks/custom/useFetchRecipes';
// import useFetchCategories from '../hooks/custom/useFetchCategories';
// import useFetchCategoryItems from '../hooks/custom/useFetchCategoryItems';

// export default function Drinks() {
//   const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes('drinks');
//   const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
//   const { fetchState, makeFetchCatItems } = useFetchCategoryItems('drinks');
//   // const [showCategory, setShowCategory] = useState(false);
//   const [recipesExhibitor, setExhibitor] = useState({ showCategory: false,
//   });
//   const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//   const drinksCatUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
//   const FIVE = 5;

//   const searchCategory = ({ target }) => {
//     makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${target.value}`);
//     setExhibitor({ ...recipesExhibitor,
//       showCategory: !recipesExhibitor.showCategory,
//     });
//   };

//   // const categoryBtns = () => categories.drinks.slice(0, FIVE).reduce((acc, p) => {
//   //   makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${p.strCategory}`);
//   //   acc = [(
//   //     <button
//   //       key={ p.strCategory }
//   //       data-testid={ `${p.strCategory}-category-filter` }
//   //       type="button"
//   //       value={ `${p.strCategory}` }
//   //       onClick={ searchCategory }
//   //     >
//   //       {p.strCategory}
//   //     </button>
//   //   ), ...acc,
//   //   ];
//   //   return acc;
//   // }, []);

//   useEffect(() => {
//     makeFetchRecipes(drinksRecipesUrl); // pega as receitas gerais de meals //
//     makeFetchCat(drinksCatUrl);
//   }, []);

//   // useEffect(() => {
//   //   categoryBtns();
//   //   console.log('chamou a categ');
//   // }, []);

//   const showAllMeals = () => {
//     setExhibitor({ ...recipesExhibitor,
//       showCategory: false,
//     });
//   };
//   // console.log(recipesData);
//   // console.log(categories);

//   return (
//     <div>
//       { !isLoadingCat && (
//         <div>
//           {recipesExhibitor.showCategory && (
//             <button
//               onClick={ showAllMeals }
//               type="button"
//               data-testid="All-category-filter"
//             >
//               All
//             </button>
//           )}
//           {categories.drinks.slice(0, FIVE)
//             .map((e) => (
//               <button
//                 key={ e.strCategory }
//                 data-testid={ `${e.strCategory}-category-filter` }
//                 type="button"
//                 value={ `${e.strCategory}` }
//                 onClick={ searchCategory }
//               >
//                 {e.strCategory}
//               </button>))}
//           {/* {categories.drinks.slice(0, FIVE).reduce((acc, p) => {
//             makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${p.strCategory}`);
//             acc = [(
//               <button
//                 key={ p.strCategory }
//                 data-testid={ `${p.strCategory}-category-filter` }
//                 type="button"
//                 value={ `${p.strCategory}` }
//                 onClick={ searchCategory }
//               >
//                 {p.strCategory}
//               </button>
//             ), ...acc,
//             ];
//             return acc;
//           }, [])} */}
//         </div>
//       )}

//       { !isLoading
//       && (
//         <div style={ { height: '80vh' } }>
//           {recipesExhibitor.showCategory && !fetchState.isLoadingItems
//             ? <DrinkCard recipesData={ fetchState.items } />
//             : <DrinkCard recipesData={ recipesData } />}
//         </div>
//       )}

//     </div>
//   );
// }
