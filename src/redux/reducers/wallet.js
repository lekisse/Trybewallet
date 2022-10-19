// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import { SET_EXPENSE, ADD_CURRENCIES, DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return ({
      ...state,
      currencies: action.payload,
    });
  case SET_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  default:
    return state;
  }
}
