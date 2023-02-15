import { screen } from '@testing-library/react';

export const invalidEmail = '@email';
export const validEmail = 'email@email.com';
export const invalidPassword = 'abc123';
export const validPassword = 'abc1234';

export const promiseMock = (mock) => Promise
  .resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mock),
  });

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
