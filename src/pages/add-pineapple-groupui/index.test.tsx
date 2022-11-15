import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  groupuiChange, render, screen, waitFor, fireEvent,
} from '../../test/utils';
import AddPineappleGroupui from './index';

const server = setupServer();

describe('add pineapple page with GroupUI', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('renders a heading and description', () => {
    render(<AddPineappleGroupui />);

    expect(screen.getByText('Add a Pineapple')).toBeVisible();
    expect(screen.getByText('We choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.')).toBeVisible();
    expect(screen.getByText('Sometimes it also important to have pineapples, so please complete the details below:')).toBeVisible();
  });

  it.each`
    field     | label
    ${'name'} | ${'Name *'}
    ${'description'} | ${'Description *'}
  `('renders the $field field', async ({ field, label }) => {
    render(<AddPineappleGroupui />);

    const textbox = screen.getByPlaceholderText(`Type the ${field}`);
    expect(textbox).toBeVisible();
    expect(textbox).toHaveTextContent(label);
    expect(textbox).toHaveValue('');

    groupuiChange(textbox, `${field}-value`);
    expect(textbox).toHaveValue(`${field}-value`);
  });

  it('submits the form values', async () => {
    let requestData: any;
    server.use(
      rest.post(`${process.env.API_URL}/pineapple`, async (req, res, ctx) => {
        requestData = await req.json();
        return res(ctx.status(201));
      }),
    );

    render(<AddPineappleGroupui />);

    groupuiChange(screen.getByPlaceholderText('Type the name'), 'name-value');
    groupuiChange(screen.getByPlaceholderText('Type the description'), 'description-value');

    const button = screen.getByText('Save');
    expect(button).toBeVisible();
    expect(screen.queryByText('Your pineapple has been successfully added!')).not.toBeInTheDocument();

    fireEvent.submit(button);

    await waitFor(() => expect(requestData).toEqual({
      name: 'name-value',
      description: 'description-value',
    }));
    expect(await screen.findByText('Your pineapple has been successfully added!')).toBeVisible();
  });

  it.each`
    name              | message
    ${'name'}         | ${'Name is required'}
    ${'description'}  | ${'Description is required'}
  `('validates $name', async ({ message }) => {
    render(<AddPineappleGroupui />);

    fireEvent.submit(screen.getByText('Save'));

    expect(await screen.findByText(message)).toBeVisible();
  });

  it('renders an error when failing to submit', async () => {
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error.mockImplementation(() => null);
    let isCalled = false;
    server.use(
      rest.post(`${process.env.API_URL}/pineapple`, (req, res, ctx) => {
        isCalled = true;
        return res(ctx.status(500));
      }),
    );

    render(<AddPineappleGroupui />);

    groupuiChange(screen.getByPlaceholderText('Type the name'), 'name-value');
    groupuiChange(screen.getByPlaceholderText('Type the description'), 'description-value');

    expect(screen.queryByText('Oops! There has been error trying to add the pineapple.')).not.toBeInTheDocument();
    fireEvent.submit(screen.getByText('Save'));

    await waitFor(() => expect(isCalled).toBe(true));
    expect(await screen.findByText('Oops! There has been error trying to add the pineapple.')).toBeVisible();
    expect(screen.queryByText('Your pineapple has been successfully added!')).not.toBeInTheDocument();
  });
});
