import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const customRender = (element: React.ReactElement, route: string = '/') => ({
  user: userEvent.setup(),
  ...render(
    <MemoryRouter initialEntries={[route]}>
      {element}
    </MemoryRouter>,
  ),
});

export * from '@testing-library/react';
export {
  customRender as render,
};
