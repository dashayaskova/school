import React, { FunctionComponent } from 'react';

import Navbar from '@/components/Navbar'
import UserForm from '@/components/UserForm';
import { editUser } from '@/actions';
import { ParamsType, ClassType } from '@/generated/graphql';
import { UserType } from '@/generated/graphql';

type EditUserProps = {
  params: ParamsType,
  classes: ClassType[],
  currentUser: UserType
};

const EditUser: FunctionComponent<EditUserProps> = (props) => {
    const onSubmit = async (user: UserType, onSuccess: () => void, onError: () => void) => {
      if(!user.name) {
        onError();
        return;
      }

      await editUser(user, onSuccess, onError);
    }

    return (
        <Navbar title="Редагувати юзера">
            <UserForm onFormSubmit={onSubmit} user={props.currentUser} params={props.params} classes={props.classes} />
        </Navbar>
    );
};

export default EditUser;
