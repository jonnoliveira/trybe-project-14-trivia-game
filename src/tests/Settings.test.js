import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Test the "Settings page"', () => {
  it('checks if the "Settings" page is rendered correctly', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const btnSettings = screen.getByRole('button', {
      name: /settings/i
    });

    expect(btnSettings).toBeDefined();

    act(() => {
      userEvent.click(btnSettings)
    })

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');

  })
})