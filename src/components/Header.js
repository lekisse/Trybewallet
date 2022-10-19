import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, { currency, value, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>Wallet</h1>
        <h3 data-testid="email-field">{ `Email: ${email}` }</h3>
        <h3>Despesas</h3>
        <span data-testid="total-field">{this.sumExpenses().toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  state: PropTypes.func,
  email: PropTypes.string,
}.isReaquired;

export default connect(mapStateToProps)(Header);
