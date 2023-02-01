// import React, { useEffect, useState } from 'react';
// import DrinkCard from '../components/DrinkCard';
// import useFetchRecipes from '../hooks/custom/useFetchRecipes';
// import useFetchCategories from '../hooks/custom/useFetchCategories';
// import useFetchCategoryItemsDrinks from '../hooks/custom/useFetchCategoryItemsDrinks ';
// import DrinkCardCategory from '../components/DrinkCardCategory';
// import { Link } from 'react-router-dom';

// export default function Drinks() {
//   const { isLoading, recipesData, makeFetchRecipes } = useFetchRecipes();
//   const { isLoadingCat, categories, makeFetchCat } = useFetchCategories();
//   // const { isLoadingItems, items, makeFetchCatItems } = useFetchCategoryItems();
//   const { fetchState, makeFetchCatItems } = useFetchCategoryItemsDrinks();
//   // const [showCategory, setShowCategory] = useState(false);
//   // const [showAllRecipes, setShowAllRecipes] = useState(true);
//   const [recipesExhibitor, setExhibitor] = useState({ showCategory: false,
//     showAllRecipes: true,
//     catValue: '' });
//   const drinksRecipesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//   const drinksCatUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
//   const FIVE = 5;

//   useEffect(() => {
//     makeFetchRecipes(drinksRecipesUrl); // pega as receitas gerais de meals //
//     makeFetchCat(drinksCatUrl);
//     makeFetchCatItems();
//   }, []);

//   const searchCategory = ({ target }) => {
//     // makeFetchCatItems(`https://www.thecocktaildb.com//api/json/v1/1/filter.php?c=${target.value}`);
//     // setShowCategory(!showCategory);
//     console.log(target.value);
//     setExhibitor({ ...recipesExhibitor,
//       showCategory: !recipesExhibitor.showCategory,
//       showAllRecipes: !recipesExhibitor.showAllRecipes,
//       catValue: target.value.replaceAll(/\W/g, '') });
//   };

//   // const showAllDrinks = () => {
//   //   setShowCategory(false);
//   //   setShowAllRecipes(true);
//   // };

//   return (
//     <div>
//       { !isLoadingCat && (
//         <div>
//           {/* {recipesExhibitor.showCategory && (
//             <button
//               onClick={ showAllDrinks }
//               type="button"
//               data-testid="All-category-filter"
//             >
//               All
//             </button>
//           )} */}
//           { categories.drinks.slice(0, FIVE)
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
//         </div>
//       )}
//       { !isLoading
//       && (
//         <div style={ { height: '80vh' } }>
//           {recipesExhibitor.showCategory && !fetchState.isLoadingItems
//             ? <div>
//               {
//                 fetchState[recipesExhibitor.catValue].map((e, index) => (
//                   <div
//                     data-testid={ `${index}-recipe-card` }
//                     key={ e.idDrink }
//                   >
//                     <Link to={ `/drinks/${e.idDrink}` }>
//                       <img
//                         data-testid={ `${index}-card-img` }
//                         src={ `${e.strDrinkThumb}/preview` }
//                         alt={ e.strDrink }
//                       />
//                     </Link>
//                     <p data-testid={ `${index}-card-name` }>{ e.strDrink }</p>
//                   </div>
//                 ))

//               }
//             </div>
//             : <DrinkCard recipesData={ recipesData } />}
//         </div>
//       )}

//       {/* { !isLoading
//       && (
//         <div style={ { height: '80vh' } }>
//           {recipesExhibitor.showCategory && !fetchState.isLoadingItems
//             ? <DrinkCardCategory items={ fetchState[recipesExhibitor.catValue] } />
//             : <DrinkCard recipesData={ recipesData } />}
//         </div>
//       )} */}
//       {/* {!isLoading && recipesExhibitor.showAllRecipes
//       && (
//         <div style={ { height: '80vh' } }>
//           <DrinkCard recipesData={ recipesData } />
//         </div>
//       )}
//       {!fetchState.isLoadingItems && recipesExhibitor.showCategory
//       && (
//         <div style={ { height: '80vh' } }>
//           <DrinkCardCategory items={ fetchState[recipesExhibitor.catValue] } />
//           {' '}
//         </div>
//       )} */}
//     </div>
//   );
// }
