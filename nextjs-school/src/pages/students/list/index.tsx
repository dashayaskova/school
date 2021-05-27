import React, { useState, FunctionComponent } from 'react';
import { Column } from 'material-table';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { createStudent, editStudent, deleteStudent } from '@/actions/student';
import { StudentInput, StudentType } from '@/generated/graphql';
import { User } from '@/utils/userReq';

type StudentsListProps = {
  students: StudentType[],
  user: User
};

const StudentsList: FunctionComponent<StudentsListProps> = (props) => {
  const [students, setStudents] = useState(props.students);

  return (
    <Navbar title={"База даних учнів"}>
      <Table
        options={{
          grouping: true
        }}
        title=""
        columns={[
            { title: "Прізвище", field: 'surname', validate: rowData => Boolean(rowData.surname) },
            { title: "Ім'я", field: 'name', validate: rowData => Boolean(rowData.name) },
            { title: "По батькові", field: 'patronymic' },
            { title: 'День народження', field: 'birthday', type: 'date', validate: rowData => Boolean(rowData.birthday) },
            { title: 'Телефон', field: 'phone' },
            { title: 'Пошта', field: 'email' },
            { title: 'Номер особ. справи', field: 'registryId', validate: rowData => Boolean(rowData.registryId) },
        ] as Column<StudentType>[]}
        data={students}
        editable={{
          onRowAdd: (newData: StudentInput) =>
          new Promise<void>((resolve) => {
              createStudent(newData, 
                (resp) => setStudents([...students, resp]));
              resolve();
          }),
          onRowUpdate: (newData: StudentType, oldData: StudentType) =>
            new Promise<void>((resolve) => {
                const id = oldData.id;

                editStudent(newData, 
                  (resp) => setStudents(students.map((el) => id !== el.id ? el : resp)));

                resolve();
            }),
            ...(props.user.isAdmin && { onRowDelete: (oldData: StudentType) =>
            new Promise<void>(async (resolve) => {
              const id = oldData.id;
              deleteStudent(id, () => setStudents(students.filter((el) => id !== el.id)));
              resolve()
            })
          })
        }}
      />
    </Navbar>
  );
};

export default StudentsList;
