import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  catItemBeef,
  catItemDessert,
  findAllCategoryMeals,
  findAllRecipes,
  findBtnAll,
  findBtnSearch,
  findBtnStartSearch,
  findCatBeef,
  findCatDessert,
  findElementByTxt,
  findImgCard,
  findInputSearch,
  findLinkProfile,
  findRadiofirstLetter,
  findRadioIngredient,
  findRadioName,
  findTitleHeader,
  getLoading,
  jestMocksFetchsMeals,
  mockMeals,
  queryBtnAll,
  queryBtnStartSearch,
  queryInputSearch,
  queryRadioFirstLetter,
  queryRadioIngredient,
  queryRadioName,
  renderWithRouter,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Meals.', () => {
  beforeEach(() => {
    global.fetch = jest.fn(jestMocksFetchsMeals);
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

  test('Verifica se o componente Header possui os elementos e a barra de busca.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(2)));

    expect(await findTitleHeader()).toBeVisible();
    expect(await findTitleHeader()).toHaveTextContent('Meals');
    expect(await findBtnSearch()).toBeVisible();
    expect(await findLinkProfile()).toBeVisible();
    expect(queryInputSearch()).not.toBeInTheDocument();
    expect(queryRadioIngredient()).not.toBeInTheDocument();
    expect(queryRadioName()).not.toBeInTheDocument();
    expect(queryRadioFirstLetter()).not.toBeInTheDocument();
    expect(queryBtnStartSearch()).not.toBeInTheDocument();

    userEvent.click(await findBtnSearch());

    expect(await findInputSearch()).toBeVisible();
    expect(await findRadioIngredient()).toBeVisible();
    expect(await findRadioName()).toBeVisible();
    expect(await findRadiofirstLetter()).toBeVisible();
    expect(await findBtnStartSearch()).toBeVisible();

    userEvent.type(await findInputSearch(), 'lamb');
    userEvent.click(await findRadioName());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(10);

    userEvent.clear(await findInputSearch());
    userEvent.type(await findInputSearch(), 'tomato');
    userEvent.click(await findRadioIngredient());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(9);

    userEvent.clear(await findInputSearch());
    userEvent.type(await findInputSearch(), 'a');
    userEvent.click(await findRadiofirstLetter());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(4);

    userEvent.click(await findBtnSearch());

    expect(queryInputSearch()).not.toBeInTheDocument();
    expect(queryRadioIngredient()).not.toBeInTheDocument();
    expect(queryRadioName()).not.toBeInTheDocument();
    expect(queryRadioFirstLetter()).not.toBeInTheDocument();
    expect(queryBtnStartSearch()).not.toBeInTheDocument();
  });

  test('Verifica se ao clicar numa categoria uma outra vez, é feito um fetch sem filtro da categoria.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(await findCatBeef());

    expect(await findElementByTxt(catItemBeef.meals[0].strMeal)).toBeVisible();
    expect(await findElementByTxt(catItemBeef.meals[1].strMeal)).toBeVisible();
    expect(await findElementByTxt(catItemBeef.meals[2].strMeal)).toBeVisible();

    userEvent.click(await findCatBeef());

    expect(await findElementByTxt(mockMeals.meals[0].strMeal)).toBeVisible();
    expect(await findElementByTxt(mockMeals.meals[1].strMeal)).toBeVisible();
    expect(await findElementByTxt(mockMeals.meals[2].strMeal)).toBeVisible();

    userEvent.click(await findCatDessert());

    expect(await findElementByTxt(catItemDessert.meals[0].strMeal)).toBeVisible();
    expect(await findElementByTxt(catItemDessert.meals[1].strMeal)).toBeVisible();
    expect(await findElementByTxt(catItemDessert.meals[2].strMeal)).toBeVisible();

    userEvent.click(await findCatDessert());

    expect(await findElementByTxt(mockMeals.meals[0].strMeal)).toBeVisible();
    expect(await findElementByTxt(mockMeals.meals[1].strMeal)).toBeVisible();
    expect(await findElementByTxt(mockMeals.meals[2].strMeal)).toBeVisible();
  });

  test('Verifica se ao clicar numa receita, o usuário é redirecionado para a page Recipe Details.', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(await findImgCard(mockMeals.meals[0].strMeal));

    expect(history.location.pathname).toBe('/meals/52977');
  });
});
