import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Flexbox from '../../components/styled/flexbox';

const AddPineapple = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [notification, setNotification] = useState<string | undefined>(undefined);

  const onSubmit = handleSubmit((data) => fetch(`${process.env.API_URL}/pineapple`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => (
    setNotification(response.ok
      ? 'Your pineapple has been successfully added!'
      : 'Oops! There has been error trying to add the pineapple.')
  )));

  return (
    <>
      {notification && <p>{notification}</p>}
      <h2>Add a Pineapple</h2>
      <p>
        We choose to go to the moon. We choose to go to the moon in this decade and do the other
        things, not because they are easy, but because they are hard, because that goal will serve
        to organize and measure the best of our energies and skills, because that challenge is one
        that we are willing to accept, one we are unwilling to postpone, and one which we intend to
        win, and the others, too.
      </p>
      <p>Sometimes it also important to have pineapples, so please complete the details below:</p>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Type the name"
            {...register('name', { required: { value: true, message: 'Name is required' } })}
          />
          {errors.name && <span role="alert">{errors.name.message?.toString()}</span>}
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Type the description"
            {...register('description', { required: { value: true, message: 'Description is required' } })}
          />
          {errors.description && <span role="alert">{errors.description.message?.toString()}</span>}
        </fieldset>
        <fieldset>
          <Flexbox gap={0.4}>
            <input
              type="checkbox"
              id="agree"
              {...register('agree')}
            />
            <label htmlFor="agree">Agree to the pineapple spike risk</label>
          </Flexbox>
        </fieldset>
        <fieldset>
          <p>Favourite colour:</p>
          <Flexbox gap={0.4}>
            <input
              type="radio"
              id="color-green"
              value="green"
              {...register('color')}
            />
            <label htmlFor="color-green">Green pineapple</label>
          </Flexbox>
          <Flexbox gap={0.4}>
            <input
              type="radio"
              id="color-yellow"
              value="yellow"
              {...register('color')}
            />
            <label htmlFor="color-yellow">Yellow pineapple</label>
          </Flexbox>
        </fieldset>
        <fieldset>
          <label htmlFor="type">Favourite type:</label>
          <select
            id="type"
            {...register('type', { required: { value: true, message: 'Favourite type is required' } })}
          >
            <option value="">Select you favourite type</option>
            <option value="ice-cream">Ice-cream Flavour</option>
            <option value="pizza">On a Pizza</option>
            <option value="margarita">On a Margarita</option>
          </select>
          {errors.type && <span role="alert">{errors.type.message?.toString()}</span>}
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default AddPineapple;
