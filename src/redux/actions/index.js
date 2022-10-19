// Coloque aqui suas actions
import APIrequest from '../../components/APIrequest';

export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE = 'DELETE';

export const addCurrenciesGlobal = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const directExpense = (payload) => ({
  type: SET_EXPENSE,
  payload,
});

export const stateApi = (payload) => async (dispatch) => {
  const API = await APIrequest();
  dispatch(directExpense({ ...payload, exchangeRates: API }));
};

export const deleteItem = (payload) => ({
  type: DELETE,
  id: payload,
});
