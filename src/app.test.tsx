import React from 'react';
import App from './app';
import { render, screen } from './test/utils';

jest.mock('./pages/add-pineapple', () => () => 'mock-add-pineapple-page');
jest.mock('./pages/add-pineapple-groupui', () => () => 'mock-add-pineapple-groupui-page');

describe('app', () => {
  it.each`
    page                            | route         | content
    ${'add pineapple'}              | ${'/'}        | ${'mock-add-pineapple-page'}
    ${'add pineapple with GroupUI'} | ${'/groupui'} | ${'mock-add-pineapple-groupui-page'}
  `('renders the $page page at $route', ({ route, content }) => {
    render(<App />, route);

    expect(screen.getByText(content)).toBeVisible();
  });
});
