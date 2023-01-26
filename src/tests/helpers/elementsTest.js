import { screen } from '@testing-library/react';

export const invalidEmail = '@email';
export const validEmail = 'email@email.com';
export const invalidPassword = 'abc123';
export const validPassword = 'abc1234';

export const getEmail = () => screen.getByTestId('email-input');
export const getPassword = () => screen.getByTestId('password-input');
export const getButton = () => screen.getByTestId('login-submit-btn');
