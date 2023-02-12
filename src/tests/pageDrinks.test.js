import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  catItemOrdDrink,
  catItemShake,
  findAllCategoryDrinks,
  findAllRecipes,
  findBtnAll,
  findCatOrdinDrink,
  findCatShake,
  getLoading,
  mockDrinks,
  mockDrinksCategory,
  queryBtnAll,
  renderWithRouter,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Drinks.', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('search')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockDrinks),
        });
      }

      if (url.includes('list')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockDrinksCategory),
        });
      }

      if (url.includes('Ordinary Drink')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(catItemOrdDrink),
        });
      }

      if (url.includes('Shake')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(catItemShake),
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a page renderiza 12 receitas e 5 categorias do fetch.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    waitForElementToBeRemoved(
      () => act(() => expect(getLoading()).toHaveLength(2)), // 2 loading: 1 para recipes e outro para o category
    );

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(await findAllCategoryDrinks()).toHaveLength(5);
    expect(await findAllRecipes()).toHaveLength(12);
  });

  test('Verifica se ocorre um novo fetch ao clicar em uma categoria.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(2)));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(queryBtnAll()).not.toBeInTheDocument();

    userEvent.click(await findCatOrdinDrink());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));
    await waitFor(async () => expect(await findBtnAll()).toBeVisible());
    expect(global.fetch).toHaveBeenCalledTimes(3);

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.click(await findCatShake());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));
    expect(global.fetch).toHaveBeenCalledTimes(4);

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.click(await findBtnAll());

    waitFor(() => expect(queryBtnAll()).not.toBeInTheDocument());
    expect(await findAllRecipes()).toHaveLength(12);
  });
});
