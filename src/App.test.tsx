import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders hi', () => {
    render(<App />);

    expect(screen.getByText('Hi.')).toBeVisible();
  });
});
