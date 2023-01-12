import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';

describe('Login page tests',() => {
    test('if it contains name and email inputs and button', () => {
        renderWithRouterAndRedux(<Login />);
        const name = screen.getByPlaceholderText("Digite o seu melhor nome");
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });
        expect(name && email && button).toBeInTheDocument();
    });
    test('if button is disabled when inputs are empty', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toBeDisabled();
    });
    test('if button is enabled when name and email are filled correctly', ()=> {
        renderWithRouterAndRedux(<Login />);
        const name = screen.getByPlaceholderText("Digite o seu melhor nome");
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });
        userEvent.type(name, 'João');
        userEvent.type(email, 'joao@dominio.com');
        expect(button).toBeEnabled();
    })
    test('if name and email are dispatched to global state', () => {
        const { store } = renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByPlaceholderText("Digite o seu melhor nome");
        const emailInput = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });

        act(() => {
            userEvent.type(nameInput, 'João');
            userEvent.type(emailInput, 'joao@dominio.com');
            userEvent.click(button);
        });
        const { loginReducer: { name, email } } = store.getState();
        expect(name).toBe('João');
        expect(email).toBe('joao@dominio.com');
    });
});
