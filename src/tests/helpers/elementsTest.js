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
  recipeDetailsCorba,
  recipeDetailsGG,
  searchDrinkFirstLetterJ,
  searchIngrtIce,
  searchIngrtTomato,
  searchMealFirstLetterA,
  searchNameLamb,
  searchNameVodka,
} from './mocks';

export const invalidEmail = '@email';
export const validEmail = 'email@email.com';
export const invalidPassword = 'abc123';
export const validPassword = 'abc1234';

const promiseMock = (mock) => Promise
  .resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mock),
  });

export function jestMocksFetchsMeals(url) {
  // AVISO: a ordem dos ifs importam! Não altere as posições para evitar dor de cabeça.

  if (url.includes('lookup.php?i=52977')) return promiseMock(recipeDetailsCorba);

  if (url.includes('search.php?s=lamb')) return promiseMock(searchNameLamb);

  if (url.includes('filter.php?i=tomato')) return promiseMock(searchIngrtTomato);

  if (url.includes('search.php?f=a')) return promiseMock(searchMealFirstLetterA);

  if (url.includes('Beef')) return promiseMock(mealCatItemBeef);

  if (url.includes('Dessert')) return promiseMock(mealCatItemDessert);

  if (url.includes('search')) return promiseMock(mockMeals);

  if (url.includes('list')) return promiseMock(mealsCategory);
}

export function jestMocksFetchsDrinks(url) {
  // AVISO: a ordem dos ifs importam! Não altere as posições para evitar dor de cabeça.
  if (url.includes('lookup.php?i=15997')) return promiseMock(recipeDetailsGG);

  if (url.includes('search.php?f=j')) return promiseMock(searchDrinkFirstLetterJ);

  if (url.includes('filter.php?i=ice')) return promiseMock(searchIngrtIce);

  if (url.includes('search.php?s=vodka')) return promiseMock(searchNameVodka);

  if (url.includes('Ordinary Drink')) return promiseMock(drinkCatItemOrdDrink);

  if (url.includes('Shake')) return promiseMock(drinkCatItemShake);

  if (url.includes('search')) return promiseMock(mockDrinks);

  if (url.includes('list')) return promiseMock(drinksCategory);
}

export const getEmail = () => screen.getByTestId('email-input');
export const getPassword = () => screen.getByTestId('password-input');
export const getButton = () => screen.getByTestId('login-submit-btn');
export const getProfileEmail = () => screen.getByTestId('profile-email');
export const doneRecipesBtn = () => screen.getByTestId('profile-done-btn');
export const favoritesBtn = () => screen.getByTestId('profile-favorite-btn');
export const logoutBtn = () => screen.getByTestId('profile-logout-btn');
export const drinkFooterBtn = () => screen.getByTestId('drinks-bottom-btn');
export const findAllRecipes = () => screen.findAllByTestId(/recipe-card$/i);
export const findAllCategoryMeals = () => screen
  .findAllByText(/^Beef|Breakfast|Chicken|Dessert|Goat$/);
export const findAllCategoryDrinks = () => screen
  .findAllByText(/^Ordinary\sDrink|Cocktail|Shake|Other\s\/\sUnknown|Cocoa$/);
export const getLoading = () => screen.getAllByText(/^loading/i);
export const findCatBeef = () => screen.findByText(/^Beef$/);
export const findCatDessert = () => screen.findByText(/^Dessert$/);
export const findCatOrdinDrink = () => screen.findByText(/^Ordinary\sDrink$/);
export const findCatShake = () => screen.findByText(/^Shake$/);
export const findBtnAll = () => screen.findByText(/^all$/i);
export const queryBtnAll = () => screen.queryByText(/^all$/i);
export const findTitleHeader = () => screen.findByTestId('page-title');
export const findBtnSearch = () => screen.findByTestId('search-top-btn');
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
export const findImgCard = (string = '') => screen.findByRole('img', { name: new RegExp(`^${string}$`, 'i') });
