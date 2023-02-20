import { screen } from '@testing-library/react';
import {
  drinkCatItemOrdDrink,
  drinkCatItemShake,
  drinksCategory,
  mealCatItemBeef,
  mealCatItemDessert,
  mealsCategory,
  mockDrinks,
  mockMeals,
  promiseMock,
  recipeDetailsCorba,
  recipeDetailsGG,
  searchDrinkFirstLetterJ,
  searchIngrtIce,
  searchIngrtTomato,
  searchMealFirstLetterA,
  searchNameLamb,
  searchNameVodka,
} from './mocks';

const TEN = 10;

export const invalidEmail = '@email';
export const validEmail = 'email@email.com';
export const invalidPassword = 'abc123';
export const validPassword = 'abc1234';
export const START_RECIPE = 'Start Recipe';
export const CONTINUE_RECIPE = 'Continue Recipe';
export const urlMealsCorba = [`/meals/${mockMeals.meals[0].idMeal}`];
export const urlDrinksGG = [`/drinks/${mockDrinks.drinks[0].idDrink}`];

export function jestMocksFetchsMeals(url) {
  if (/lookup\.php\?i=52977$/i.test(url)) return promiseMock(recipeDetailsCorba);

  if (/search\.php\?s=lamb$/i.test(url)) return promiseMock(searchNameLamb);

  if (/filter\.php\?i=tomato$/i.test(url)) return promiseMock(searchIngrtTomato);

  if (/search\.php\?f=a$/i.test(url)) return promiseMock(searchMealFirstLetterA);

  if (/Beef/.test(url)) return promiseMock(mealCatItemBeef);

  if (/Dessert/.test(url)) return promiseMock(mealCatItemDessert);

  if (/search\.php\?s=$/i.test(url)) return promiseMock(mockMeals);

  if (/list$/i.test(url)) return promiseMock(mealsCategory);
}

export function jestMocksFetchsDrinks(url) {
  if (/lookup\.php\?i=15997$/i.test(url)) return promiseMock(recipeDetailsGG);

  if (/search\.php\?f=j$/i.test(url)) return promiseMock(searchDrinkFirstLetterJ);

  if (/filter\.php\?i=ice$/i.test(url)) return promiseMock(searchIngrtIce);

  if (/search\.php\?s=vodka$/i.test(url)) return promiseMock(searchNameVodka);

  if (/Ordinary Drink/.test(url)) return promiseMock(drinkCatItemOrdDrink);

  if (/Shake/.test(url)) return promiseMock(drinkCatItemShake);

  if (/search\.php\?s=$/i.test(url)) return promiseMock(mockDrinks);

  if (/list$/i.test(url)) return promiseMock(drinksCategory);
}

export const mockMealCorbaInProgress = (key) => (
  key === 'inProgressRecipes' && JSON.stringify({ meals: { 52977: [] } })
);

export const mockMealCorbaDoned = (key) => (
  key === 'doneRecipes'
  && JSON.stringify([
    {
      id: mockMeals.meals[0].idMeal,
      type: 'meal',
      nationality: mockMeals.meals[0].strArea,
      category: mockMeals.meals[0].strCategory,
      name: mockMeals.meals[0].strMeal,
      image: mockMeals.meals[0].strMealThumb,
      alcoholicOrNot: '',
      doneDate: new Date().toJSON().slice(0, TEN),
      tags: mockMeals.meals[0].strTags.split(',', 2),
    },
  ])
);

export const mockDrinkGGInProgress = (key) => (
  key === 'inProgressRecipes' && JSON.stringify({ drinks: { 15997: [] } })
);

export const mockDrinkGGDoned = (key) => (
  key === 'doneRecipes'
    && JSON.stringify([
      {
        id: mockDrinks.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: mockDrinks.drinks[0].strCategory,
        name: mockDrinks.drinks[0].strDrink,
        image: mockDrinks.drinks[0].strDrinkThumb,
        alcoholicOrNot: mockDrinks.drinks[0].strAlcoholic,
        doneDate: new Date().toJSON().slice(0, TEN),
        tags: mockDrinks.drinks[0].strTags || [],
      },
    ])
);

export const getEmail = () => screen.getByTestId('email-input');
export const getPassword = () => screen.getByTestId('password-input');
export const getButton = () => screen.getByTestId('login-submit-btn');
export const getProfileEmail = () => screen.getByTestId('profile-email');
export const doneRecipesBtn = () => screen.getByTestId('profile-done-btn');
export const favoritesBtn = () => screen.getByTestId('profile-favorite-btn');
export const logoutBtn = () => screen.getByTestId('profile-logout-btn');
export const drinkFooterBtn = () => screen.getByTestId('drinks-bottom-btn');
export const findAllRecipes = () => screen.findAllByTestId(/recipe-card$/i);
export const findAllCategoryMeals = () => screen.findAllByText(
  /^Beef|Breakfast|Chicken|Dessert|Goat$/,
);
export const findAllCategoryDrinks = () => screen.findAllByText(
  /^Ordinary\sDrink|Cocktail|Shake|Other\s\/\sUnknown|Cocoa$/,
);
export const getLoading = () => screen.getAllByText(/^loading/i);
export const findCatBeef = () => screen.findByText(/^Beef$/);
export const findCatDessert = () => screen.findByText(/^Dessert$/);
export const findCatOrdinDrink = () => screen.findByText(/^Ordinary\sDrink$/);
export const findCatShake = () => screen.findByText(/^Shake$/);
export const findBtnAll = () => screen.findByText(/^all$/i);
export const queryBtnAll = () => screen.queryByText(/^all$/i);
export const findTitleHeader = () => screen.findByTestId('page-title');
export const findBtnSearch = () => screen.findByTestId('search-top-btn');
export const queryBtnSearch = () => screen.queryByTestId('search-top-btn');
export const findLinkProfile = () => screen.findByTestId('profile-top-btn');
export const findInputSearch = () => screen.findByTestId('search-input');
export const queryInputSearch = () => screen.queryByTestId('search-input');
export const findRadioIngredient = () => screen.findByTestId('ingredient-search-radio');
export const queryRadioIngredient = () => screen.queryByTestId('ingredient-search-radio');
export const findRadioName = () => screen.findByTestId('name-search-radio');
export const queryRadioName = () => screen.queryByTestId('name-search-radio');
export const findRadiofirstLetter = () => screen.findByTestId('first-letter-search-radio');
export const queryRadioFirstLetter = () => screen.queryByTestId('first-letter-search-radio');
export const findBtnStartSearch = () => screen.findByTestId('exec-search-btn');
export const queryBtnStartSearch = () => screen.queryByTestId('exec-search-btn');
export const findElementByTxt = (string = '') => screen.findByText(new RegExp(`^${string}$`));
export const queryElementByTxt = (string = '') => screen.queryByText(new RegExp(`^${string}$`));
export const findImgCard = (string = '') => screen.findByRole('img', { name: new RegExp(`^${string}$`, 'i') });
export const findBtnStartRecipe = () => screen.findByTestId('start-recipe-btn');
export const queryBtnStartRecipe = () => screen.queryByRole('button', { name: /start recipe/i });
export const findBtnShareRecipe = () => screen.findByTestId('share-btn');
export const findBtnFavoriteRecipe = () => screen.findByTestId('favorite-btn');
export const findRecipeDetailsImg = () => screen.findByTestId('recipe-photo');
export const findRecipeDetailsVideo = () => screen.findByTestId('video');
export const findRecipeDetailsInstructions = () => screen.findByTestId('instructions');
export const findRecipeDetailsTitle = () => screen.findByTestId('recipe-title');
export const findRecipeDetailsCategory = () => screen.findByTestId('recipe-category');
export const findRecipeDetailsIgrtAndMsr = () => screen.findAllByTestId(/ingredient-name-and-measure$/i);
export const findRecipeDetailsTxtShared = () => screen.findByText('Link copied!');
