import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  doneRecipesBtn,
  favoritesBtn,
  getUserInfo,
  logoutBtn,
  renderWithRouter,
  validEmail,
} from './helpers';
import { Profile } from '../pages';

localStorage.setItem('user', JSON.stringify(validEmail));

describe('Testes da página de Profile.', () => {
  test('verifica se há os botões Done Recipes , Favorite e Logout e o email do usuário', () => {
    renderWithRouter(<Profile />);

    expect(getUserInfo()).toBeInTheDocument();
    expect(doneRecipesBtn()).toBeInTheDocument();
    expect(favoritesBtn()).toBeInTheDocument();
    expect(logoutBtn()).toBeInTheDocument();
  });

  test.only('Verifica se ao clicar nos botões ocorre o redirecionamento correto para outras pages', async () => {
    renderWithRouter(<Profile />);

    userEvent.click(doneRecipesBtn());
    userEvent.click(favoritesBtn());
    userEvent.click(logoutBtn());
  });
});
