import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

const groupuiChange = (element: Document | Element | Window | Node, value: string) => {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  element.value = value;
  fireEvent(element, new Event('groupuiChange'));
};

export * from '@testing-library/react';
export {
  groupuiChange,
  customRender as render,
};
