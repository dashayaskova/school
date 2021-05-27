import React, { FunctionComponent } from 'react';

import Navbar from '@/components/Navbar';
import UserForm from '@/components/UserForm';
import { addUser } from '@/actions';
import { FullUser } from '@/utils/userReq';
import { ParamsType, ClassType } from '@/generated/graphql';

type AddUserProps = {
  params: ParamsType,
  classes: ClassType[]
};

const AddUser: FunctionComponent<AddUserProps> = (props) => {
    const onSubmit = async (user: FullUser, onSuccess: () => void, onError: () => void) => {
        if(!user.password || !user.email || !user.name) {
          onError();
          return;
        }

        await addUser(user, onSuccess, onError);
    }

    return (
        <Navbar title="Додати користувача">
            <UserForm 
              onFormSubmit={onSubmit} 
              user={{ 
                classAccess: [],
                isAdmin: false,
                name: '',
                email: '',
                uid: '',
                id: '',
                password: ''
              }} 
              params={props.params} 
              classes={props.classes} />
        </Navbar>
    );
};

export default AddUser;
