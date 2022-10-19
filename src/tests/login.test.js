import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a página de login', () => {
  it('checks if there is a login text', () => {
    renderWithRouterAndRedux(<App />);

    const loginText = screen.getByText(/login/i);
    expect(loginText).toBeInTheDocument();
  });

  it('testa se tem inputs de email e senha na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('testa se após o login, o usuário é redirecionado à pagina da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = 'test@test.com';
    const password = '123456';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(button);

    expect(button).not.toBeDisabled();
    expect(history.location.pathname).toBe('/carteira');
  });
});
