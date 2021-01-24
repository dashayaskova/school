import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import {
  Button,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { deleteUser, deleteFirebaseUser } from '@/actions';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1)
  }
}));

const UserList = (props) => {
  const classes = useStyles();
  const [teachers, setTeachers] = useState(props.teachers);

  return (
    <Navbar title={"Користувачі"} user={props.user}>
      <Button className={classes.addUser} color={"secondary"} variant={"contained"}
        onClick={() => Router.push("/users/add")}>Додати користувача</Button>

      <Table
        title=""
        columns={[
          { title: 'ФІО', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Адміністратор', field: 'isAdmin', type: 'boolean' }
        ]}
        data={teachers}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit User',
            onClick: (event, rowData) => {
              Router.push(`/users/edit/${rowData.id}`);
            }
          }
        ]}
        editable={{
          onRowDelete: oldData =>
            new Promise(async (resolve, reject) => {
              const id = oldData.id;
              var success = await deleteUser(id, async () => await deleteFirebaseUser(oldData.uid));
              if (success) {
                const newArr = teachers.filter((el) => el.id !== id);
                setTeachers(newArr);
              }
              resolve()
            }),
        }}
      />
    </Navbar>
  );
};

export default UserList;