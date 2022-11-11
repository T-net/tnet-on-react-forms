import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, within } from '../../test/utils';
import AddPineapple from './index';

const server = setupServer();

describe('add pineapple page', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('renders a heading and description', () => {
    render(<AddPineapple />);

    expect(screen.getByText('Add a Pineapple')).toBeVisible();
    expect(screen.getByText('We choose to go to the moon. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win, and the others, too.')).toBeVisible();
    expect(screen.getByText('Sometimes it also important to have pineapples, so please complete the details below:')).toBeVisible();
  });

  it('renders the form fields', async () => {
    const { user } = render(<AddPineapple />);

    const nameTextbox = screen.getByRole('textbox', { name: 'Name:' });
    expect(nameTextbox).toBeVisible();
    expect(nameTextbox).toHaveAttribute('placeholder', 'Type the name');
    expect(nameTextbox).toHaveValue('');

    await user.type(nameTextbox, 'name-value');
    expect(nameTextbox).toHaveValue('name-value');

    const descriptionTextbox = screen.getByRole('textbox', { name: 'Description:' });
    expect(descriptionTextbox).toBeVisible();
    expect(descriptionTextbox).toHaveAttribute('placeholder', 'Type the description');
    expect(descriptionTextbox).toHaveValue('');

    await user.type(descriptionTextbox, 'description-value');
    expect(descriptionTextbox).toHaveValue('description-value');

    const agreeCheckbox = screen.getByRole('checkbox', { name: 'Agree to the pineapple spike risk' });
    expect(agreeCheckbox).toBeVisible();
    expect(agreeCheckbox).not.toBeChecked();

    await user.click(agreeCheckbox);
    expect(agreeCheckbox).toBeChecked();

    expect(screen.getByText('Favourite colour:')).toBeVisible();

    const greenRadio = screen.getByRole('radio', { name: 'Green pineapple' });
    expect(greenRadio).toBeVisible();
    expect(greenRadio).not.toBeChecked();

    const yellowRadio = screen.getByRole('radio', { name: 'Yellow pineapple' });
    expect(yellowRadio).toBeVisible();
    expect(yellowRadio).not.toBeChecked();

    await user.click(greenRadio);
    expect(greenRadio).toBeChecked();
    expect(yellowRadio).not.toBeChecked();

    await user.click(yellowRadio);
    expect(yellowRadio).toBeChecked();
    expect(greenRadio).not.toBeChecked();

    const typeCombobox = screen.getByRole('combobox', { name: 'Favourite type:' });
    expect(typeCombobox).toBeVisible();
    expect(typeCombobox).toHaveDisplayValue('Select you favourite type');
    expect(typeCombobox).toHaveValue('');

    const options = within(typeCombobox).getAllByRole('option');
    expect(options).toHaveLength(4);

    await user.selectOptions(typeCombobox, [options[1]]);
    expect(typeCombobox).toHaveDisplayValue('Ice-cream Flavour');
    expect(typeCombobox).toHaveValue('ice-cream');

    await user.selectOptions(typeCombobox, [options[2]]);
    expect(typeCombobox).toHaveDisplayValue('On a Pizza');
    expect(typeCombobox).toHaveValue('pizza');

    await user.selectOptions(typeCombobox, [options[3]]);
    expect(typeCombobox).toHaveDisplayValue('On a Margarita');
    expect(typeCombobox).toHaveValue('margarita');
  });

  it('submits the form values', async () => {
    let requestData: any;
    server.use(
      rest.post(`${process.env.API_URL}/pineapple`, async (req, res, ctx) => {
        requestData = await req.json();
        return res(ctx.status(201));
      }),
    );

    const { user } = render(<AddPineapple />);

    await user.type(screen.getByRole('textbox', { name: 'Name:' }), 'name-value');
    await user.type(screen.getByRole('textbox', { name: 'Description:' }), 'description-value');
    await user.click(screen.getByRole('checkbox', { name: 'Agree to the pineapple spike risk' }));
    await user.click(screen.getByRole('radio', { name: 'Yellow pineapple' }));

    const combobox = screen.getByRole('combobox', { name: 'Favourite type:' });
    await user.selectOptions(combobox, [within(combobox).getAllByRole('option')[1]]);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeVisible();
    expect(screen.queryByText('Your pineapple has been successfully added!')).not.toBeInTheDocument();

    await user.click(button);
    expect(requestData).toEqual({
      name: 'name-value',
      description: 'description-value',
      agree: true,
      color: 'yellow',
      type: 'ice-cream',
    });
    expect(await screen.findByText('Your pineapple has been successfully added!')).toBeVisible();
  });

  it.each`
    name              | message
    ${'name'}         | ${'Name is required'}
    ${'description'}  | ${'Description is required'}
    ${'type'}         | ${'Favourite type is required'}
  `('validates $name', async ({ message }) => {
    const { user } = render(<AddPineapple />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

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

    const { user } = render(<AddPineapple />);

    await user.type(screen.getByRole('textbox', { name: 'Name:' }), 'name-value');
    await user.type(screen.getByRole('textbox', { name: 'Description:' }), 'description-value');
    const combobox = screen.getByRole('combobox', { name: 'Favourite type:' });
    await user.selectOptions(combobox, [within(combobox).getAllByRole('option')[1]]);

    expect(screen.queryByText('Oops! There has been error trying to add the pineapple.')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(isCalled).toBe(true);
    expect(await screen.findByText('Oops! There has been error trying to add the pineapple.')).toBeVisible();
    expect(screen.queryByText('Your pineapple has been successfully added!')).not.toBeInTheDocument();
  });
});
