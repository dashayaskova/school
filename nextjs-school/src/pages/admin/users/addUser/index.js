import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../../../components/Navbar';
import UserForm from '../../../../components/UserForm';
import { addUser } from '../../../../actions';

const useStyles = makeStyles((theme) => ({}));

const AddUser = (props) => {
    const classes = useStyles();

    const onSubmit = async (user) => {
        await addUser(user);
        window.location.pathname = '/admin/users';
    }

    return (
        <Navbar title="Додати користувача">
            <UserForm onFormSubmit={onSubmit} user={{ classAccess: [], isAdmin: false }} />
        </Navbar>
    );
};

export default AddUser;
