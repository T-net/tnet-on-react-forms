import React from 'react';
import Flexbox from '../../components/styled/flexbox';

const AddPineapple = () => (
  <>
    <h2>Add a Pineapple</h2>
    <p>
      We choose to go to the moon. We choose to go to the moon in this decade and do the other
      things, not because they are easy, but because they are hard, because that goal will serve
      to organize and measure the best of our energies and skills, because that challenge is one
      that we are willing to accept, one we are unwilling to postpone, and one which we intend to
      win, and the others, too.
    </p>
    <p>Sometimes it also important to have pineapples, so please complete the details below:</p>
    <form>
      <fieldset>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="Type the name" />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" placeholder="Type the description" rows={4} />
      </fieldset>
      <fieldset>
        <Flexbox gap={0.4}>
          <input type="checkbox" name="agree" id="agree" />
          <label htmlFor="agree">Agree to the pineapple spike risk</label>
        </Flexbox>
      </fieldset>
      <fieldset>
        <p>Favourite colour:</p>
        <Flexbox gap={0.4}>
          <input type="radio" name="color" id="color-green" />
          <label htmlFor="color-green">Green pineapple</label>
        </Flexbox>
        <Flexbox gap={0.4}>
          <input type="radio" name="color" id="color-yellow" />
          <label htmlFor="color-yellow">Yellow pineapple</label>
        </Flexbox>
      </fieldset>
      <fieldset>
        <label htmlFor="type">Favourite type:</label>
        <select name="type" id="type">
          <option value="">Select you favourite type</option>
          <option value="ice-cream">Ice-cream Flavour</option>
          <option value="pizza">On a Pizza</option>
          <option value="margarita">On a Margarita</option>
        </select>
      </fieldset>
    </form>
  </>
);

export default AddPineapple;
