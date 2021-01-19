import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '@/components/Navbar'
import UserForm from '@/components/UserForm';
import { editUser } from '@/actions';

const useStyles = makeStyles((theme) => ({}));

const EditUser = (props) => {
    const classes = useStyles();
    const onSubmit = async (user, onSuccess, onError) => {
        await editUser(user, onSuccess, onError);
    }

    return (
        <Navbar title="Редагувати юзера">
            <UserForm onFormSubmit={onSubmit} user={props.user} params={props.params} classes={props.classes} />
        </Navbar>
    );
};

export default EditUser;
