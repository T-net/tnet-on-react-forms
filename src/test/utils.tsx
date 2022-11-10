import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRender = (element: React.ReactElement, route: string = '/') => render(
  <MemoryRouter initialEntries={[route]}>
    {element}
  </MemoryRouter>,
);

export * from '@testing-library/react';
export {
  customRender as render,
};
