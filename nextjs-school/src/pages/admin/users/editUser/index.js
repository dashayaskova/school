import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../../../components/Navbar'
import UserForm from '../../../../components/UserForm';
import { editUser } from '../../../../actions';

const useStyles = makeStyles((theme) => ({}));

const EditUser = (props) => {
    const classes = useStyles();
    const onSubmit = async (user) => {
        await editUser(user);
        window.location.pathname = '/admin/users';
    }

    return (
        <Navbar title="Редагувати юзера">
            <UserForm onFormSubmit={onSubmit} user={props.user} />
        </Navbar>
    );
};

export default EditUser;
