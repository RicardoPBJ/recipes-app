import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  catItemBeef,
  catItemDessert,
  findAllCategoryMeals,
  findAllRecipes,
  findBtnAll,
  findCatBeef,
  findCatDessert,
  getLoading,
  mockMeals,
  mockMealsCategory,
  queryBtnAll,
  renderWithRouter,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Meals.', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('search')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockMeals),
        });
      }

      if (url.includes('list')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockMealsCategory),
        });
      }

      if (url.includes('Beef')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(catItemBeef),
        });
      }

      if (url.includes('Dessert')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(catItemDessert),
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a page renderiza 12 receitas e 5 categorias do fetch.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    waitForElementToBeRemoved(
      () => act(() => expect(getLoading()).toHaveLength(2)), // 2 loading: 1 para recipes e outro para o category
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(await findAllCategoryMeals()).toHaveLength(5);
    expect(await findAllRecipes()).toHaveLength(12);
  });

  test('Verifica se ocorre um novo fetch ao clicar em uma categoria.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    waitForElementToBeRemoved(
      () => act(() => expect(getLoading()).toHaveLength(2)),
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(queryBtnAll()).not.toBeInTheDocument();

    userEvent.click(await findCatBeef());

    await waitFor(async () => expect(await findBtnAll()).toBeVisible());
    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));
    expect(global.fetch).toHaveBeenCalledTimes(3);

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.click(await findCatDessert());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));
    expect(global.fetch).toHaveBeenCalledTimes(4);

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.click(await findBtnAll());

    waitFor(() => expect(queryBtnAll()).not.toBeInTheDocument());
    expect(await findAllRecipes()).toHaveLength(12);
  });
});
