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

  jest.setTimeout(35000)

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

  it('checks if the buttons are disabled after 30 seconds', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);


    const buttons = await screen.findAllByRole('button');

    expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDefined();
    expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDisabled();

    await waitFor(() => {
      expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDisabled();
    }, { timeout: 32000 });
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

  it('checks if a question with its own category and its answers is generated', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const question = await screen.findByRole('heading', {
      name: /In 2015, David Hasselhof released a single called\.\.\./i,
      level: 2,
    });

    const category = await screen.findByRole('heading', {
      name: /Entertainment: Music/i,
      level: 3,
    })

    const buttons = await screen.findAllByRole('button');

    expect(question && category).toBeDefined();
    expect(buttons[0] && buttons[1] && buttons[2] && buttons[3]).toBeDefined();
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

  it('check if the timer is counting down', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const timer = await screen.findByTestId('timer');
    expect(timer).toHaveTextContent('30');

    await waitFor(() => {
      expect(timer).toHaveTextContent('22');
    }, { timeout: 9000 })
  });

  it('checks if the smallest number in the counter is 0', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const timer = await screen.findByTestId('timer');
    expect(timer).toHaveTextContent('30');

    await waitFor(async () => {
      const timer00 = await screen.findByTestId('timer');
      expect(timer00).toHaveTextContent('0');
    }, { timeout: 33000 })
  });

  it('checks if the "next button" appears when clicking on an answer', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const buttons = await screen.findAllByRole('button');
    const correctAnswer = buttons.filter((button) => button.className === 'correctAnswer');

    expect(correctAnswer).toBeDefined();

    await waitFor(() => {
      expect(correctAnswer[0]).toBeEnabled();
    }, { timeout: 8000 });

    act(() => {
      userEvent.click(correctAnswer[0])
    })

    const btnNext = await screen.findByRole('button', {
      name: /next/i
    })

    expect(btnNext).toBeDefined();
  });

  it('checks if a new question is generated when pressing the next button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const buttons = await screen.findAllByRole('button');
    const correctAnswer = buttons.filter((button) => button.className === 'correctAnswer');

    expect(correctAnswer).toBeDefined();

    await waitFor(() => {
      expect(correctAnswer[0]).toBeEnabled();
    }, { timeout: 8000 });

    act(() => {
      userEvent.click(correctAnswer[0])
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
    const newCorrectAnswer = buttons.filter((button) => button.className === 'correctAnswer');

    expect(question && category).toBeDefined();
    expect(newButtons[0] && newButtons[1]).toBeDefined();
    expect(newCorrectAnswer[0]).toHaveValue('True');
  });

  it('check that the calculation of points is done correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const correctAnswer01 = await screen.findByRole('button', { name: 'True Survivor' });
    const timer01 = await screen.findByTestId('timer');

    await waitFor(() => {
      expect(correctAnswer01).toBeEnabled();
      expect(timer01).toHaveTextContent('25');
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer01);
    })

    const score01 = store.getState().player.score;
    expect(score01).toBe(60)

    const btnNext01 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext01);
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
  })

  it('make sure the feedback page renders at the end of the 5 questions', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const correctAnswer01 = await screen.findByRole('button', { name: 'True Survivor' });

    await waitFor(() => {
      expect(correctAnswer01).toBeEnabled();
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer01);
    })

    const btnNext01 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext01);
    })

    // ========== 2º question ========== //

    const correctAnswer02 = await screen.findByRole('button', { name: 'True' });

    await waitFor(() => {
      expect(correctAnswer02).toBeEnabled();
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer02);
    })

    const btnNext02 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext02);
    })

    // ========== 3º question ========== //

    const correctAnswer03 = await screen.findByRole('button', { name: 'True' });

    await waitFor(() => {
      expect(correctAnswer03).toBeEnabled();
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer03);
    })

    const btnNext03 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext03);
    })

    // ========== 4º question ========== //

    const correctAnswer04 = await screen.findByRole('button', { name: 'False' });

    await waitFor(() => {
      expect(correctAnswer04).toBeEnabled();
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer04);
    })

    const btnNext04 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext04);
    })

    // ========== 5º question ========== //

    const correctAnswer05 = await screen.findByRole('button', { name: 'False' });

    await waitFor(() => {
      expect(correctAnswer05).toBeEnabled();
    }, { timeout: 6000 })

    act(() => {
      userEvent.click(correctAnswer05);
    })

    const btnNext05 = await screen.findByRole('button', { name: 'Next' })

    act(() => {
      userEvent.click(btnNext05);
    })

    // ========== Feedback ========== //

    const { pathname } = history.location;

    expect(pathname).toBe('/feedback')
  })
})