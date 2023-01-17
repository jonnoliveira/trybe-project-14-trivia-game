import React from 'react';
import { act, findByText, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

describe('Test the "Game page"', () => {
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
  const errorMockData = {
    response_code: 3,
    results: [],
  };
  const initialEntries = '/game';
  const initialState = {
    loginReducer: {
      name: '',
      email: ''
    },
    player: {
      assertions: 0,
      score: 0,
      src: '',
      index: 0
    }
  };

  jest.setTimeout(7000)

  it('checks if a wrong code returns to the main page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(errorMockData),
    });

    const initialState = {
      loginReducer: {
        name: 'Jonathas',
        email: ''
      },
      player: {
        assertions: 0,
        score: 0,
        src: 'https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f2',
        index: 0
      }
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    act(() => {
      history.push(initialEntries)
    })
  });

  it('checks if the buttons are enabled after 5 seconds', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const buttons = await screen.findAllByRole('button');

    expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDefined();
    expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDisabled();

    await waitFor(() => {
      expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeEnabled();
    }, { timeout: 6000 });
  });

  it('checks if the style of the buttons changes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const buttons = await screen.findAllByRole('button');

    await waitFor(() => {
      expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeEnabled();
    }, { timeout: 6000 });

    act(() => {
      userEvent.click(buttons[0])
    })

    const correctAnswer = await screen.findByText('True Survivor');
    const wrongAnswers = buttons.filter((button) => button.className !== 'correctAnswer');

    expect(correctAnswer.style.borderColor).toBe('rgb(6, 240, 15)');
    expect(wrongAnswers).toHaveLength(3);
    expect(wrongAnswers[0].style.borderColor && wrongAnswers[1].style.borderColor && wrongAnswers[2].style.borderColor).toBe('rgb(255, 0, 0)');
  })

  it('check if there is a timer on the page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const timer = await screen.findByTestId('timer');
    expect(timer).toHaveTextContent('30');
  });

  it('checks if a new question is generated when pressing the next button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const correctAnswer = await screen.findByRole('button', { name: 'True Survivor' });

    expect(correctAnswer).toBeDefined();

    await waitFor(() => {
      expect(correctAnswer).toBeEnabled();
    }, { timeout: 8000 });

    act(() => {
      userEvent.click(correctAnswer)
    })

    const btnNext = await screen.findByRole('button', {
      name: /next/i
    })

    expect(btnNext).toBeDefined();

    act(() => {
      userEvent.click(btnNext)
    })

    const question = await screen.findByRole('heading', {
      name: /Russia passed a law in 2013 which outlaws telling children that homosexuals exist./i,
      level: 2,
    });

    const category = await screen.findByRole('heading', {
      name: /Politics/i,
      level: 3,
    })

    const newButtons = await screen.findAllByRole('button');
    const newCorrectAnswer = newButtons.filter((button) => button.className === 'correctAnswer');

    expect(question && category).toBeDefined();
    expect(newButtons[0] && newButtons[1]).toBeDefined();
    expect(newCorrectAnswer[0]).toHaveValue('True');
  });

  jest.setTimeout(30000)

  it('check if the page is redirected to ranking page after 5 questions and if the calculation of points is done correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history, store } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const correctAnswer = await screen.findByRole('button', { name: 'True Survivor' });
    const timer = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer).toBeEnabled();
      expect(timer).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer);
    })

    const score = store.getState().player.score;
    expect(score).toBe(60)

    const btnNext = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext);
    })

    // ========== 2º question ========== //

    const correctAnswer02 = await screen.findByRole('button', { name: 'True' });
    const timer02 = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer02).toBeEnabled();
      expect(timer02).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer02);
    })

    const score02 = store.getState().player.score;
    expect(score02).toBe(95)

    const btnNext02 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext02);
    })

    // ========== 3º question ========== //

    const correctAnswer03 = await screen.findByRole('button', { name: 'True' });
    const timer03 = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer03).toBeEnabled();
      expect(timer03).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer03);
    })

    const score03 = store.getState().player.score;
    expect(score03).toBe(180)

    const btnNext03 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext03);
    })

    // ========== 4º question ========== //

    const correctAnswer04 = await screen.findByRole('button', { name: 'False' });
    const timer04 = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer04).toBeEnabled();
      expect(timer04).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer04);
    })

    const score04 = store.getState().player.score;
    expect(score04).toBe(215)

    const btnNext04 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext04);
    })

    // ========== 5º question ========== //

    const correctAnswer05 = await screen.findByRole('button', { name: 'False' });
    const timer05 = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer05).toBeEnabled();
      expect(timer05).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer05);
    })

    const score05 = store.getState().player.score;
    expect(score05).toBe(250)

    const btnNext05 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext05);
    })

    const { pathname } = history.location;

    expect(pathname).toBe('/feedback')
  })
});