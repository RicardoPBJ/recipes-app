import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import {
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
  mockClipboard,
  mockLocalStorage,
  queryElementByTxt,
  queryRecipeDetailsTxtShared,
  renderWithRouter,
} from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Teste da page Recipe Details', () => {
  beforeAll(() => {
    mockClipboard();
    mockLocalStorage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a page Recipes Details faz um fetch da receita selecionada anteriormente na page meals.', async () => {
    global.fetch = jest.fn(jestMocksFetchsMeals);

    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977',
    );
    expect(queryElementByTxt('link copied!')).not.toBeInTheDocument();
    expect(await findBtnStartRecipe()).toBeVisible();
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

    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997',
    );
    expect(queryElementByTxt('link copied!')).not.toBeInTheDocument();
    expect(await findBtnStartRecipe()).toBeVisible();
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
    const spyClipboardWriteText = jest.spyOn(navigator.clipboard, 'writeText');
    const spyClipboardReadText = jest.spyOn(navigator.clipboard, 'readText');
    const spySetLocalStorage = jest.spyOn(localStorage, 'setItem');

    global.fetch = jest.fn(jestMocksFetchsMeals);

    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    userEvent.click(await findBtnShareRecipe());

    waitFor(async () => {
      expect(spyClipboardWriteText).toBeCalled();
      expect(spyClipboardReadText).toBeCalled();
      expect(await findRecipeDetailsTxtShared());
      expect(queryRecipeDetailsTxtShared()).not.toBeInTheDocument();
    });

    userEvent.click(await findBtnFavoriteRecipe());

    expect(spySetLocalStorage).toBeCalled();
  });

  test('Verifica se os botões são funcionais da rota herdada page drinks.', async () => {
    const spyClipboardWriteText = jest.spyOn(navigator.clipboard, 'writeText');
    const spyClipboardReadText = jest.spyOn(navigator.clipboard, 'readText');
    const spySetLocalStorage = jest.spyOn(localStorage, 'setItem');

    global.fetch = jest.fn(jestMocksFetchsDrinks);

    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });

    waitForElementToBeRemoved(() => act(() => expect(getLoading()).toHaveLength(1)));

    userEvent.click(await findBtnShareRecipe());

    waitFor(async () => {
      expect(spyClipboardWriteText).toBeCalled();
      expect(spyClipboardReadText).toBeCalled();
      expect(await findRecipeDetailsTxtShared());
      expect(queryRecipeDetailsTxtShared()).not.toBeInTheDocument();
    });

    userEvent.click(await findBtnFavoriteRecipe());

    expect(spySetLocalStorage).toBeCalled();
  });
});
