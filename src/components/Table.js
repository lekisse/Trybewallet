import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../redux/actions';
import '../css/table.css';

class Table extends Component {
  render() {
    const { expense, handleDelete } = this.props;
    return (
      <table>
        <tbody className="herolist">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tbody>
        <tbody>
          {expense.map((element) => {
            const { id, description, tag, method, value,
              exchangeRates, currency } = element;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>BRL</td>
                <td>
                  <button
                    onClick={ () => handleDelete(id) }
                    data-testid="delete-btn"
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expense: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(deleteItem(id)),
});

Table.propTypes = {
  expense: PropTypes.arrayOf.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
