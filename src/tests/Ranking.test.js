import React from 'react';
import { act, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test the "Ranking page"', () => {
  const initialEntries = '/ranking';
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

  it('checks if the "Ranking" page is rendered correctly', () => {
    const listOfPlayers = [
      {
        index: 0,
        name: "Josefino Maria de Souza",
        src: 'https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f2',
        assertions: 4,
        score: 559
      },
      {
        index: 1,
        name: "Jonathas Assis de Oliveira",
        src: "https://www.gravatar.com/avatar/9cfbda41e2fcbb1932b9e46a100aadf5",
        assertions: 1,
        score: 35
      },
      {
        index: 2,
        name: "Amanda Senra",
        src: "https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3",
        assertions: 3,
        score: 155
      },
    ];
    localStorage.setItem('players', JSON.stringify(listOfPlayers));

    renderWithRouterAndRedux(<App />, initialState, initialEntries);


    // player 01
    const imgPlayer01 = screen.getByRole('img', {
      name: /Josefino Maria de Souza/i,
      src: 'https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f2',
    });

    const namePlayer01 = screen.getByRole('heading', {
      name: /Josefino Maria de Souza/i,
    });

    const scorePLayer01 = screen.getByText(/559/i);

    expect(imgPlayer01 && namePlayer01 && scorePLayer01).toBeDefined();
  })

  it('checks if the button "Home" is rendered correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const btnHome = screen.getByRole('button', {
      name: /home/i
    });

    expect(btnHome).toBeDefined();

    act(() => {
      userEvent.click(btnHome);
    })

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  })
});