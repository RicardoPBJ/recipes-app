import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  doneRecipesBtn,
  favoritesBtn,
  getProfileEmail,
  logoutBtn,
  mockLocalStorage,
  renderWithRouter,
  validEmail,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Profile.', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage() });
    window.localStorage.setItem('user', JSON.stringify({ email: validEmail }));
  });

  test('verifica se há os botões Done Recipes , Favorite e Logout e o email do usuário', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    expect(getProfileEmail()).toBeVisible();
    expect(getProfileEmail()).toHaveTextContent(validEmail);
    expect(doneRecipesBtn()).toBeVisible();
    expect(favoritesBtn()).toBeVisible();
    expect(logoutBtn()).toBeVisible();
  });

  test('Verifica se ao clicar nos botões ocorre o redirecionamento correto para outras pages', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    act(() => userEvent.click(doneRecipesBtn()));

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));

    act(() => history.push('/profile'));

    act(() => userEvent.click(favoritesBtn()));

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));

    act(() => history.push('/profile'));

    act(() => userEvent.click(logoutBtn()));

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
