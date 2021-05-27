import React, { useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import {
  Button,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { Column } from 'material-table';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { deleteUser, deleteFirebaseUser } from '@/actions';
import { User } from '@/utils/userReq';
import { UserType } from '@/generated/graphql';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginLeft: 'auto',
    marginBottom: theme.spacing(1)
  }
}));

type UserListProps = {
  user: User,
  teachers: UserType[]
};

const UserList: FunctionComponent<UserListProps> = (props) => {
  const classes = useStyles();
  const [teachers, setTeachers] = useState(props.teachers);

  return (
    <Navbar title={"Користувачі"}>
      <Button className={classes.addUser} color={"secondary"} variant={"contained"}
        onClick={() => Router.push("/users/add")}>Додати користувача</Button>

      <Table
        title=""
        columns={[
          { title: 'ФІО', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Адміністратор', field: 'isAdmin', type: 'boolean' }
        ] as Column<UserType>[]}
        data={teachers}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit User',
            onClick: (_: any, rowData: UserType) => {
              Router.push(`/users/edit/${rowData.id}`);
            }
          }
        ]}
        editable={{
          onRowDelete: (oldData: UserType) =>
            new Promise<void>(async (resolve, reject) => {
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
