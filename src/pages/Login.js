import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  validateEmail = () => {
    const { email } = this.state;
    return /\S+@\S+\.\S+/.test(email);
  };

  handleChange = ({ target }) => {
    this.setState(
      {
        [target.name]: target.value,
      },
      () => {
        const minPassword = 5;
        const { password } = this.state;
        if (this.validateEmail() && password.length > minPassword) {
          this.setState({
            disabled: false,
          });
        } else {
          this.setState({
            disabled: true,
          });
        }
      },
    );
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch({ type: 'LOGIN', payload: { ...this.state } });
    history.push('/carteira');
  };

  render() {
    const { disabled, email, password } = this.state;
    return (
      <div className="fatherDiv">
        <div className="childDiv">
          <h1 className="title">Login</h1>
          <label htmlFor="email">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <br />
          <br />
          <label htmlFor="password">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <br />
          <br />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
const mapStateToProps = (state) => ({
  email: state,
});
export default connect(mapStateToProps)(Login);
