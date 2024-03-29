import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  drinkFooterBtn,
  getButton,
  getEmail,
  getPassword,
  invalidEmail,
  invalidPassword,
  renderWithRouter,
  validEmail,
  validPassword,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da página de Login.', () => {
  test('verifica se há os elementos inputs do e-mail, senha, e o botão desabilitado.', () => {
    renderWithRouter(<App />);

    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getButton()).toBeInTheDocument();
    expect(getButton()).toBeDisabled();
  });

  test('Verifica se o email e senha válidos desabilitam o botão.', () => {
    renderWithRouter(<App />);

    userEvent.type(getEmail(), validEmail);
    userEvent.type(getPassword(), validPassword);

    waitFor(() => expect(getButton()).not.toBeDisabled());

    userEvent.clear(getEmail());
    userEvent.clear(getPassword());

    userEvent.type(getEmail(), invalidEmail);
    userEvent.type(getPassword(), invalidPassword);

    waitFor(() => expect(getButton()).toBeDisabled());
  });

  test('Verifica se o botão redireciona a page `/meals` ao clicar.', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(getEmail(), validEmail);
    userEvent.type(getPassword(), validPassword);
    userEvent.click(getButton());

    waitFor(() => expect(history.location.pathname).toBe('/meals'));

    userEvent.click(drinkFooterBtn());

    waitFor(() => expect(history.location.pathname).toBe('/drinks'));
  });
});
