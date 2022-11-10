import React from 'react';
import { render, screen } from '../../test/utils';
import AddPineapple from './index';

describe('add pineapple page', () => {
  it('renders add pineapple', () => {
    render(<AddPineapple />);

    expect(screen.getByText('Add pineapple')).toBeVisible();
  });
});
