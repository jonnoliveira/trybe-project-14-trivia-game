import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Login page tests', () => {
    test('if it contains name and email inputs and button', () => {
        renderWithRouterAndRedux(<App />);
        const name = screen.getByPlaceholderText('Digite o seu melhor nome');
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });
        expect(name && email && button).toBeInTheDocument();
    });
    test('if button is disabled when inputs are empty', () => {
        renderWithRouterAndRedux(<App />);
        const button = screen.getByRole('button', { name: /play/i });
        expect(button).toBeDisabled();
    });
    test('if button is enabled when name and email are filled correctly', () => {
        renderWithRouterAndRedux(<App />);
        const name = screen.getByPlaceholderText('Digite o seu melhor nome');
        const email = screen.getByPlaceholderText('Digite seu melhor email');
        const button = screen.getByRole('button', { name: /play/i });
        act(() => {
            userEvent.type(name, 'João');
            userEvent.type(email, 'joao@dominio.com');
        })
        expect(button).toBeEnabled();
    })
    test('if name and email are dispatched to global state', async () => {
        const mockData = {
            "response_code": 0,
            "results": [
                {
                    "category": "Entertainment: Music",
                    "type": "multiple",
                    "difficulty": "medium",
                    "question": "In 2015, David Hasselhof released a single called...",
                    "correct_answer": "True Survivor",
                    "incorrect_answers": [
                        "True Fighter",
                        "Real Kung-Fury",
                        "Real Warrior"
                    ]
                },
                {
                    "category": "Politics",
                    "type": "boolean",
                    "difficulty": "easy",
                    "question": "Russia passed a law in 2013 which outlaws telling children that homosexuals exist.",
                    "correct_answer": "True",
                    "incorrect_answers": [
                        "False"
                    ]
                },
                {
                    "category": "Politics",
                    "type": "boolean",
                    "difficulty": "hard",
                    "question": "Nazi Germany surrendered on Harry Truman&#039;s birthday while he was president.",
                    "correct_answer": "True",
                    "incorrect_answers": [
                        "False"
                    ]
                },
                {
                    "category": "Geography",
                    "type": "boolean",
                    "difficulty": "easy",
                    "question": "St. Louis is the capital of the US State Missouri.",
                    "correct_answer": "False",
                    "incorrect_answers": [
                        "True"
                    ]
                },
                {
                    "category": "Science & Nature",
                    "type": "boolean",
                    "difficulty": "easy",
                    "question": "A plant that has a life cycle for more than a year is known as an annual.",
                    "correct_answer": "False",
                    "incorrect_answers": [
                        "True"
                    ]
                }
            ]
        }

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        const { history } = renderWithRouterAndRedux(<App />);

        const name = await screen.findByPlaceholderText('Digite o seu melhor nome');
        const email = await screen.findByPlaceholderText('Digite seu melhor email');
        const button = await screen.findByRole('button', { name: /play/i });

        expect(button).toBeDefined();

        act(() => {
            userEvent.type(name, 'João');
            userEvent.type(email, 'joao@dominio.com');
            userEvent.click(button);
        })

        const question = await screen.findByRole('heading', {
            name: /In 2015, David Hasselhof released a single called\.\.\./i,
            level: 2,
        });

        expect(question).toBeDefined()

        const { pathname } = history.location;

        expect(pathname).toBe('/game');
    });
});
