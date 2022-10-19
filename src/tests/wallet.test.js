import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Test wallet page', () => {
  it('checks if it is possible to change the value of the inputs and combobox of the wallet page', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('textbox', { name: /value/i });
    const inputDescription = screen.getByRole('textbox', { name: /description/i });
    const selectCurrency = screen.getByRole('combobox', { name: /currency/i });
    const selectMethod = screen.getByRole('combobox', { name: /method/i });
    const selectTag = screen.getByRole('combobox', { name: /tag/i });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(selectCurrency).toBeInTheDocument();
    expect(selectMethod).toBeInTheDocument();
    expect(selectTag).toBeInTheDocument();

    userEvent.type(inputValue, '10');
    expect(inputValue).toHaveValue('10');

    userEvent.type(inputDescription, 'BurgeKing');
    expect(inputDescription).toHaveValue('BurgeKing');

    await waitFor(() => {
      expect(selectCurrency).toHaveValue('USD');
      userEvent.selectOptions(selectCurrency, 'EUR');
      expect(selectCurrency).toHaveValue('EUR');
    });

    expect(selectMethod).toHaveValue('Dinheiro');
    userEvent.selectOptions(selectMethod, 'Cartão de débito');
    expect(selectMethod).toHaveValue('Cartão de débito');

    expect(selectTag).toHaveValue('Alimentação');
    userEvent.selectOptions(selectTag, 'Lazer');
    expect(selectTag).toHaveValue('Lazer');
  });
});
