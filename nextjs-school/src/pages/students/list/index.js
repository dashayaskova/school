import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { createStudent, editStudent, deleteStudent } from '@/actions/student';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginLeft: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  }
}));

const StudentsList = (props) => {
  const classes = useStyles();
  const [students, setStudents] = useState(props.students);

  return (
    <Navbar title={"База даних учнів"}>
      <Table
        options={{
          grouping: true
        }}
        title=""
        columns={[
            { title: "Прізвище", field: 'surname' },
            { title: "Ім'я", field: 'name' },
            { title: "По батькові", field: 'patronymic' },
            { title: 'День народження', field: 'birthday', type: 'date' },
            { title: 'Телефон', field: 'phone' },
            { title: 'Пошта', field: 'email' },
            { title: 'Номер особ. справи', field: 'registryId' },
        ]}
        data={students}
        editable={{
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
              createStudent({ ...newData }, 
                (resp) => setStudents([...students, resp]));
              resolve();
          }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                const id = oldData.id;

                editStudent({ ...newData }, 
                  (resp) => setStudents(students.map((el) => id !== el.id ? el : resp)));

                resolve();
            }),
            ...(props.user.isAdmin && { onRowDelete: oldData =>
            new Promise(async (resolve, reject) => {
              const id = oldData.id;
              deleteStudent(id, (resp) => setStudents(students.filter((el) => id !== el.id)));
              resolve()
            })
          })
        }}
      />
    </Navbar>
  );
};

export default StudentsList;
