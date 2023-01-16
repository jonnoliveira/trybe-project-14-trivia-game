import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Login page tests', () => {
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
    test('if button is enabled when name and email are filled correctly', () => {
        renderWithRouterAndRedux(<Login />);
        const name = screen.getByPlaceholderText("Digite o seu melhor nome");
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });
        userEvent.type(name, 'João');
        userEvent.type(email, 'joao@dominio.com');
        expect(button).toBeEnabled();
    })
    test('if name and email are dispatched to global state', async () => {
        const mockData = {
            "response_code": 0,
            "response_message": "Token Generated Successfully!",
            "token": "1e9b9413a87a6acef963974826f09fd0662284d7de7386aa6c46cfbc2095229b"
        };

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        renderWithRouterAndRedux(<App />);

        const name = screen.getByPlaceholderText("Digite o seu melhor nome");
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });

        act(() => {
            userEvent.type(name, 'João');
            userEvent.type(email, 'joao@dominio.com');
            userEvent.click(button);
        });
    });
});
