import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrenciesGlobal, stateApi } from '../redux/actions';
import APIrequest from './APIrequest';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { addCurrencies } = this.props;
    const data = await APIrequest();
    const currencies = Object.keys(data);
    addCurrencies(currencies);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { cotationDispatch } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag } = this.state;
    cotationDispatch({
      id,
      value,
      description,
      currency,
      method,
      tag,
    });
    this.setState({
      value: '',
      description: '',
      id: id + 1,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currenciesGlobal } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="number"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição da Despesa:
            <input
              name="description"
              type="text"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currenciesGlobal.map((currencie, index) => (
                <option value={ currencie } key={ index }>
                  {currencie}
                </option>))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Médodo de pagamento:
            <select
              name="method"
              data-testid="method-input"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currenciesGlobal: currencies,
});

const mapDispatchToProps = (dispatch) => ({
  cotationDispatch: (state) => dispatch(stateApi(state)),
  addCurrencies: (currencies) => dispatch(addCurrenciesGlobal(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
