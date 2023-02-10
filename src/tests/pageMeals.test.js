import { findAllRecipesMeals, mockMeals, renderWithRouter } from './helpers';
import App from '../App';
import '@testing-library/jest-dom';

describe('Testes da page Meals.', () => {
  beforeEach(() => {
    window.alert = jest.fn(() => 'fetch falhou.');
  });

  test('Verifica se a page renderiza 12 receitas do fetch.', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(await findAllRecipesMeals()).toHaveLength(12);
  });
});
