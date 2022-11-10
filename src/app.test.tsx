import React from 'react';
import App from './app';
import { render, screen } from './test/utils';

jest.mock('./pages/add-pineapple', () => () => 'mock-add-pineapple-page');

describe('app', () => {
  it('renders the add pineapple page at /', () => {
    render(<App />, '/');

    expect(screen.getByText('mock-add-pineapple-page')).toBeVisible();
  });
});
