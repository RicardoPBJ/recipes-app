import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
  CONTINUE_RECIPE,
  corba,
  findBtnFavoriteRecipe,
  findBtnShareRecipe,
  findBtnStartRecipe,
  findRecipeDetailsCategory,
  findRecipeDetailsIgrtAndMsr,
  findRecipeDetailsImg,
  findRecipeDetailsInstructions,
  findRecipeDetailsTitle,
  findRecipeDetailsTxtShared,
  findRecipeDetailsVideo,
  getLoading,
  GG,
  jestMocksFetchsDrinks,
  jestMocksFetchsMeals,
  mockDrinkGGDoned,
  mockDrinkGGInProgress,
  mockLocalStorage,
  mockMealCorbaDoned,
  mockMealCorbaInProgress,
  queryBtnStartRecipe,
  queryElementByTxt,
  renderWithRouter,
  START_RECIPE,
  urlDrinksGG,
  urlMealsCorba,
} from './helpers';
import App from '../App';
import 'clipboard-copy';
import '@testing-library/jest-dom';

jest.mock('clipboard-copy', () => jest.fn(Promise.resolve('url')));

describe('Teste da page Recipe Details', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Verifica se a page Recipes Details faz um fetch da receita selecionada anteriormente na page meals.', async () => {
    global.fetch = jest.fn(jestMocksFetchsMeals);

    renderWithRouter(<App />, { initialEntries: urlMealsCorba });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977',
    );
    expect(queryElementByTxt('link copied!')).not.toBeInTheDocument();
    expect(await findBtnStartRecipe()).toBeVisible();
    expect(await findBtnStartRecipe()).toHaveTextContent(new RegExp(`^${START_RECIPE}$`));
    expect(await findBtnShareRecipe()).toBeVisible();
    expect(await findBtnFavoriteRecipe()).toBeVisible();

    expect(await findRecipeDetailsImg()).toBeVisible();
    expect(await findRecipeDetailsImg()).toHaveAttribute(
      'src',
      corba.meals[0].strMealThumb,
    );
    expect(await findRecipeDetailsVideo()).toHaveAttribute(
      'src',
      corba.meals[0].strYoutube.replace(/watch\?v=/i, 'embed/'),
    );
    expect(await findRecipeDetailsInstructions()).toBeVisible();
    expect(await findRecipeDetailsInstructions()).toHaveTextContent(
      corba.meals[0].strInstructions.replace(/\s+/g, ' '),
    );
    expect(await findRecipeDetailsTitle()).toBeVisible();
    expect(await findRecipeDetailsTitle()).toHaveTextContent(corba.meals[0].strMeal);
    expect(await findRecipeDetailsCategory()).toBeVisible();
    expect(await findRecipeDetailsCategory()).toHaveTextContent(
      corba.meals[0].strCategory,
    );
    expect(await findRecipeDetailsIgrtAndMsr()).toHaveLength(13);
  });

  test('Verifica se a page Recipes Details faz um fetch da receita selecionada anteriormente na page drinks.', async () => {
    global.fetch = jest.fn(jestMocksFetchsDrinks);

    renderWithRouter(<App />, { initialEntries: urlDrinksGG });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997',
    );
    expect(queryElementByTxt('link copied!')).not.toBeInTheDocument();
    expect(await findBtnStartRecipe()).toBeVisible();
    expect(await findBtnStartRecipe()).toHaveTextContent(new RegExp(`^${START_RECIPE}$`));
    expect(await findBtnShareRecipe()).toBeVisible();
    expect(await findBtnFavoriteRecipe()).toBeVisible();

    expect(await findRecipeDetailsImg()).toBeVisible();
    expect(await findRecipeDetailsImg()).toHaveAttribute(
      'src',
      GG.drinks[0].strDrinkThumb,
    );
    expect(await findRecipeDetailsInstructions()).toBeVisible();
    expect(await findRecipeDetailsInstructions()).toHaveTextContent(
      GG.drinks[0].strInstructions.replace(/\s+/g, ' '),
    );
    expect(await findRecipeDetailsTitle()).toBeVisible();
    expect(await findRecipeDetailsTitle()).toHaveTextContent(GG.drinks[0].strDrink);
    expect(await findRecipeDetailsCategory()).toBeVisible();
    expect(await findRecipeDetailsCategory()).toHaveTextContent(
      GG.drinks[0].strAlcoholic,
    );
    expect(await findRecipeDetailsIgrtAndMsr()).toHaveLength(3);
  });

  test('Verifica se os botões são funcionais da rota herdada page meals.', async () => {
    const spySetLocalStorage = jest.spyOn(localStorage, 'setItem');

    global.fetch = jest.fn(jestMocksFetchsMeals);

    const { history } = renderWithRouter(<App />, { initialEntries: urlMealsCorba });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    userEvent.click(await findBtnShareRecipe());

    waitForElementToBeRemoved(
      async () => expect(await findRecipeDetailsTxtShared()),
      { timeout: 3000 },
    );

    userEvent.click(await findBtnFavoriteRecipe());

    expect(spySetLocalStorage).toBeCalled();

    userEvent.click(await findBtnStartRecipe());

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  test('Verifica se os botões são funcionais da rota herdada page drinks.', async () => {
    const spySetLocalStorage = jest.spyOn(localStorage, 'setItem');

    global.fetch = jest.fn(jestMocksFetchsDrinks);

    const { history } = renderWithRouter(<App />, { initialEntries: urlDrinksGG });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    userEvent.click(await findBtnShareRecipe());

    waitForElementToBeRemoved(
      async () => expect(await findRecipeDetailsTxtShared()),
      { timeout: 3000 },
    );

    userEvent.click(await findBtnFavoriteRecipe());

    expect(spySetLocalStorage).toBeCalled();

    userEvent.click(await findBtnStartRecipe());

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  test('Verifica se o botão start possui o nome `Continue Recipe` quando há a receita meals em progresso salvo no localStorage.', async () => {
    window.localStorage.getItem = jest.fn(mockMealCorbaInProgress);

    global.fetch = jest.fn(jestMocksFetchsMeals);

    renderWithRouter(<App />, { initialEntries: urlMealsCorba });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    await waitFor(
      async () => {
        expect(await findBtnStartRecipe())
          .not.toHaveTextContent(new RegExp(`^${START_RECIPE}$`));
        expect(await findBtnStartRecipe())
          .toHaveTextContent(new RegExp(`^${CONTINUE_RECIPE}$`));
      },
    );
  });

  test('Verifica se o botão start possui o nome `Continue Recipe` quando há a receita drinks em progresso salvo no localStorage.', async () => {
    window.localStorage.getItem = jest.fn(mockDrinkGGInProgress);

    global.fetch = jest.fn(jestMocksFetchsDrinks);

    renderWithRouter(<App />, { initialEntries: urlDrinksGG });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    await waitFor(
      async () => {
        expect(await findBtnStartRecipe())
          .not.toHaveTextContent(new RegExp(`^${START_RECIPE}$`));
        expect(await findBtnStartRecipe())
          .toHaveTextContent(new RegExp(`^${CONTINUE_RECIPE}$`));
      },
    );
  });

  test('Verifica se o botão start não aparece se a receita meal já estiver concluída.', async () => {
    window.localStorage.getItem = jest.fn(mockMealCorbaDoned);

    global.fetch = jest.fn(jestMocksFetchsMeals);

    renderWithRouter(<App />, { initialEntries: urlMealsCorba });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    await waitFor(
      () => {
        act(() => expect(queryBtnStartRecipe()).not.toBeInTheDocument());
      },
      { timeout: 4500 },
    );
  });

  test('Verifica se o botão start não aparece se a receita drink já estiver concluída.', async () => {
    window.localStorage.getItem = jest.fn(mockDrinkGGDoned);

    global.fetch = jest.fn(jestMocksFetchsDrinks);

    renderWithRouter(<App />, { initialEntries: urlDrinksGG });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    await waitFor(
      () => {
        act(() => expect(queryBtnStartRecipe()).not.toBeInTheDocument());
      },
      { timeout: 4500 },
    );
  });
});
