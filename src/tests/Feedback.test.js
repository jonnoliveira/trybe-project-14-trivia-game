import React from 'react';
import { act, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';
import userEvent from '@testing-library/user-event';

// jest.spyOn(global, 'fetch');
// global.fetch.mockResolvedValue({
//   json: jest.fn().mockResolvedValue(mockData),
// });

describe('Test the "Feedback page"', () => {
  const mockData = [
    {
      "category": "Science & Nature",
      "type": "multiple",
      "difficulty": "hard",
      "question": "Which of the following plastic is commonly used for window frames, gutters and drain pipes?",
      "correct_answer": "Polyvinylchloride (PVC) ",
      "incorrect_answers": [
        "Polyethylene (PE)",
        "Polypropylene (PP)",
        "Polystyrene (PS)"
      ]
    },
    {
      "category": "Entertainment: Japanese Anime & Manga",
      "type": "multiple",
      "difficulty": "hard",
      "question": "In &quot;One Piece&quot;, what does &quot;the Pirate King&quot; mean to the captain of the Straw Hat Pirates?",
      "correct_answer": "Freedom",
      "incorrect_answers": [
        "Promise",
        "Adventure",
        "Friendship"
      ]
    },
    {
      "category": "Science & Nature",
      "type": "multiple",
      "difficulty": "hard",
      "question": "How many types of quarks are there in the standard model of physics?",
      "correct_answer": "6",
      "incorrect_answers": [
        "2",
        "3",
        "4"
      ]
    },
    {
      "category": "Entertainment: Music",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What M83 was featured in Grand Theft Auto V&#039;s radio?",
      "correct_answer": "Midnight City",
      "incorrect_answers": [
        "Outro",
        "Reunion",
        "Wait"
      ]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What is the lowest amount of max health you can have in Team Fortress 2?",
      "correct_answer": "70",
      "incorrect_answers": [
        "100",
        "50",
        "95"
      ]
    }
  ];
  const initialEntries = '/feedback';
  it('checks if the "Feedback" page is rendered correctly', () => {
    ;
    renderWithRouterAndRedux(<Feedback />)

    const headingResults = screen.getByRole('heading', {
      name: /resultado/i,
      level: 1,
    });

    const headingFinalScore = screen.getByRole('heading', {
      name: /placar final:/i,
      level: 3,
    })

    const headingAssertions = screen.getByRole('heading', {
      name: /perguntas certas:/i,
      level: 3,
    })

    const btnPlayAgain = screen.getByRole('button', {
      name: /play again/i
    });

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i
    });

    expect(headingResults && headingFinalScore &&
      headingAssertions && btnPlayAgain && btnRanking).toBeDefined();
  })

  it('verifies that the final game information is rendered correctly', () => {
    const initialState = {
      loginReducer: {
        name: 'Silvio Cabrero Dantas',
        email: 'tryber@teste.com'
      },
      player: {
        assertions: 3,
        score: 173,
        src: 'https://www.gravatar.com/avatar/9cfbda41e2fcbb1932b9e46a100aadf5',
        index: 0
      }
    };
    renderWithRouterAndRedux(<Feedback />, initialState);

    const gravatar = screen.getByRole('img', {
      name: /profile/i,
      src: 'https://www.gravatar.com/avatar/9cfbda41e2fcbb1932b9e46a100aadf5',
    })

    const playerName = screen.getByText(/Silvio Cabrero Dantas/i);

    const greetings = screen.getByRole('heading', {
      name: /Well Done\!/i,
    })

    expect(gravatar && playerName && greetings).toBeDefined();
  })

  it('checks if the "Play Again" button works correctly', () => {
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
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const btnPlayAgain = screen.getByRole('button', {
      name: /play again/i,
    });

    expect(btnPlayAgain).toBeDefined();

    act(() => {
      userEvent.click(btnPlayAgain);
    })

    const { pathname } = history.location;
    const btnPlay = screen.getByRole('button', { name: /play/i });


    expect(pathname).toBe('/');
    expect(btnPlay).toBeDefined();
  })

  it('checks if the "Ranking" button works correctly', () => {
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

    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const listOfPlayers = [
      {
        index: 0,
        name: "Amanda Senra",
        src: "https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3",
        assertions: 3,
        score: 155
      },
      {
        index: 1,
        name: "Jonathas Assis de Oliveira",
        src: "https://www.gravatar.com/avatar/9cfbda41e2fcbb1932b9e46a100aadf5",
        assertions: 1,
        score: 35
      },
    ];
    localStorage.setItem('players', JSON.stringify(listOfPlayers));

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i,
    });

    expect(btnRanking).toBeDefined();

    act(() => {
      userEvent.click(btnRanking);
    })

    const { pathname } = history.location;

    const headingPlayer = screen.getByRole('heading', {
      name: /amanda senra/i,
      leel: 3,
    });

    expect(pathname).toBe('/ranking');
    expect(headingPlayer).toBeDefined();
  })
})