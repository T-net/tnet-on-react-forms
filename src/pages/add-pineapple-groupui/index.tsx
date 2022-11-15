import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  GroupuiButton, GroupuiHeadline, GroupuiNotification, GroupuiText,
} from '@group-ui/group-ui-react';
import '@group-ui/group-ui-react/node_modules/@group-ui/group-ui/dist/group-ui/assets/themes/vwag/vwag.css';
import TextInput from '../../components/form/text-input';

interface AddPineappleFields {
  name: string,
  description: string,
}

const AddPineappleGroupui = () => {
  const defaultValues: AddPineappleFields = {
    name: '',
    description: '',
  };
  const { control, handleSubmit } = useForm({ defaultValues });
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
      {notification && (
        <GroupuiNotification dismissible={false}>{notification}</GroupuiNotification>
      )}
      <GroupuiHeadline heading="h2">Add a Pineapple</GroupuiHeadline>
      <GroupuiText>
        We choose to go to the moon. We choose to go to the moon in this decade and do the other
        things, not because they are easy, but because they are hard, because that goal will serve
        to organize and measure the best of our energies and skills, because that challenge is one
        that we are willing to accept, one we are unwilling to postpone, and one which we intend to
        win, and the others, too.
      </GroupuiText>
      <GroupuiText>
        Sometimes it also important to have pineapples, so please complete the details below:
      </GroupuiText>
      <form onSubmit={onSubmit}>
        <fieldset>
          <TextInput
            name="name"
            control={control}
            placeholder="Type the name"
            label="Name"
            required
          />
        </fieldset>
        <fieldset>
          <TextInput
            name="description"
            control={control}
            placeholder="Type the description"
            label="Description"
            type="textarea"
            required
          />
        </fieldset>

        <GroupuiButton type="submit">Save</GroupuiButton>
      </form>
    </>
  );
};

export default AddPineappleGroupui;
