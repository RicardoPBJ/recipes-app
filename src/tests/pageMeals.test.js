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
  findInputSearch,
  findLinkProfile,
  findRadiofirstLetter,
  findRadioIngredient,
  findRadioName,
  findTitleHeader,
  getLoading,
  mockMeals,
  mockMealsCategory,
  promiseMock,
  queryBtnAll,
  queryBtnStartSearch,
  queryInputSearch,
  queryRadioFirstLetter,
  queryRadioIngredient,
  queryRadioName,
  renderWithRouter,
  searchIngrtTomato,
  searchMealFirstLetterA,
  searchNameLamb,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Meals.', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      // AVISO: a ordem dos ifs importam! Não altere as posições para evitar dor de cabeça.

      if (url.includes('search.php?s=lamb')) return promiseMock(searchNameLamb);

      if (url.includes('filter.php?i=tomato')) return promiseMock(searchIngrtTomato);

      if (url.includes('search.php?f=a')) return promiseMock(searchMealFirstLetterA);

      if (url.includes('Beef')) return promiseMock(catItemBeef);

      if (url.includes('Dessert')) return promiseMock(catItemDessert);

      if (url.includes('search')) return promiseMock(mockMeals);

      if (url.includes('list')) return promiseMock(mockMealsCategory);
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
});
