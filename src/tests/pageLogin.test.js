import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
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

describe('Testes da página de Login.', () => {
  test('verifica se há os elementos inputs do e-mail, senha, e o botão desabilitado.', () => {
    renderWithRouter(<App />);

    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getButton()).toBeInTheDocument();
    expect(getButton()).toBeDisabled();
  });

  test('Verifica se o email e senha válidos desabilitam o botão.', async () => {
    renderWithRouter(<App />);

    userEvent.type(getEmail(), validEmail);
    userEvent.type(getPassword(), validPassword);

    await waitFor(() => expect(getButton()).not.toBeDisabled());

    userEvent.clear(getEmail());
    userEvent.clear(getPassword());

    userEvent.type(getEmail(), invalidEmail);
    userEvent.type(getPassword(), invalidPassword);

    await waitFor(() => expect(getButton()).toBeDisabled());
  });

  test('Verifica se o botão redireciona a page `/meals` ao clicar.', async () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(getEmail(), validEmail);
    userEvent.type(getPassword(), validPassword);
    userEvent.click(getButton());

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
