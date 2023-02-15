import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  catItemOrdDrink,
  catItemShake,
  findAllCategoryDrinks,
  findAllRecipes,
  findBtnAll,
  findBtnSearch,
  findBtnStartSearch,
  findCatOrdinDrink,
  findCatShake,
  findElementByTxt,
  findImgCard,
  findInputSearch,
  findLinkProfile,
  findRadiofirstLetter,
  findRadioIngredient,
  findRadioName,
  findTitleHeader,
  getLoading,
  jestMocksFetchsDrinks,
  mockDrinks,
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

describe('Testes da page Drinks.', () => {
  beforeEach(() => {
    global.fetch = jest.fn(jestMocksFetchsDrinks);
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

  test('Verifica se o componente Header possui os elementos e a barra de busca.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(2)));

    expect(await findTitleHeader()).toBeVisible();
    expect(await findTitleHeader()).toHaveTextContent('Drinks');
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

    userEvent.type(await findInputSearch(), 'vodka');
    userEvent.click(await findRadioName());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(9);

    userEvent.clear(await findInputSearch());
    userEvent.type(await findInputSearch(), 'ice');
    userEvent.click(await findRadioIngredient());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.clear(await findInputSearch());
    userEvent.type(await findInputSearch(), 'j');
    userEvent.click(await findRadiofirstLetter());
    userEvent.click(await findBtnStartSearch());

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(await findAllRecipes()).toHaveLength(12);

    userEvent.click(await findBtnSearch());

    expect(queryInputSearch()).not.toBeInTheDocument();
    expect(queryRadioIngredient()).not.toBeInTheDocument();
    expect(queryRadioName()).not.toBeInTheDocument();
    expect(queryRadioFirstLetter()).not.toBeInTheDocument();
    expect(queryBtnStartSearch()).not.toBeInTheDocument();
  });

  test('Verifica se ao clicar numa categoria uma outra vez, é feito um fetch sem filtro da categoria.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(await findCatOrdinDrink());

    expect(await findElementByTxt(catItemOrdDrink.drinks[0].strDrink)).toBeVisible();
    expect(await findElementByTxt(catItemOrdDrink.drinks[1].strDrink)).toBeVisible();
    expect(await findElementByTxt(catItemOrdDrink.drinks[2].strDrink)).toBeVisible();

    userEvent.click(await findCatOrdinDrink());

    expect(await findElementByTxt(mockDrinks.drinks[0].strDrink)).toBeVisible();
    expect(await findElementByTxt(mockDrinks.drinks[1].strDrink)).toBeVisible();
    expect(await findElementByTxt(mockDrinks.drinks[2].strDrink)).toBeVisible();

    userEvent.click(await findCatShake());

    expect(await findElementByTxt(catItemShake.drinks[0].strDrink)).toBeVisible();
    expect(await findElementByTxt(catItemShake.drinks[1].strDrink)).toBeVisible();
    expect(await findElementByTxt(catItemShake.drinks[2].strDrink)).toBeVisible();

    userEvent.click(await findCatShake());

    expect(await findElementByTxt(mockDrinks.drinks[0].strDrink)).toBeVisible();
    expect(await findElementByTxt(mockDrinks.drinks[1].strDrink)).toBeVisible();
    expect(await findElementByTxt(mockDrinks.drinks[2].strDrink)).toBeVisible();
  });

  test('Verifica se ao clicar numa receita, o usuário é redirecionado para a page Recipe Details.', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(await findImgCard(mockDrinks.drinks[0].strDrink));

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
