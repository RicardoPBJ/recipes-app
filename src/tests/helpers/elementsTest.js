import { screen } from '@testing-library/react';

export const invalidEmail = '@email';
export const validEmail = 'email@email.com';
export const invalidPassword = 'abc123';
export const validPassword = 'abc1234';

export const getEmail = () => screen.getByTestId('email-input');
export const getPassword = () => screen.getByTestId('password-input');
export const getButton = () => screen.getByTestId('login-submit-btn');
export const getUserInfo = () => screen.getByTestId('profile-email');
export const doneRecipesBtn = () => screen.getByTestId('profile-done-btn');
export const favoritesBtn = () => screen.getByTestId('profile-favorite-btn');
export const logoutBtn = () => screen.getByTestId('profile-logout-btn');
export const drinkFooterBtn = () => screen.getByTestId('drinks-bottom-btn');
