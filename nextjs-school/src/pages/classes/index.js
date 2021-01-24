import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
  } from '@material-ui/core';
import Router from 'next/router'

import Table from '@/components/Table';
import Navbar from '@/components/Navbar'
import StudentsDialog from '@/components/StudentsDialog';
import { removeStudentFromClass } from '@/actions/student';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    addStudent: {
        marginLeft: 'auto',
        marginBottom: theme.spacing(1)
      }
}));

const StudentsClass = (props) => {
    const classes = useStyles();
    const [classObj, setClass] = useState(props.classObj);
    const [open, setOpen] = useState(false);

    return (
        <Navbar title={`Студенти ${classObj.name} класу`}>
            <Button className={classes.addStudent} color={"secondary"} variant={"contained"}
                onClick={() => setOpen(true)}>Додати учня</Button>
            <StudentsDialog
                open={open}
                onClose={() => setOpen(false)}
                classObj={classObj}
                setClass={setClass}
            />
            <Table
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
                data={classObj.students}
                actions={[
                    {
                      icon: () => <SearchIcon />,
                      tooltip: 'Переглянути табель',
                      onClick: (event, rowData) => {
                        Router.push(`/classes/${classObj.id}/students/${rowData.id}`);
                      }
                    }
                  ]}
                editable={{
                    onRowDelete: oldData =>
                      new Promise(async (resolve, reject) => {
                        const id = oldData.id;
                        var success = await removeStudentFromClass(classObj.id, id);
                        if (success) {
                          const students = classObj.students.filter((el) => el.id !== id);
                          setClass({ ...classObj, students });
                        }
                        resolve();
                      }),
                  }}
            />
        </Navbar>
    );
};

export default StudentsClass;
