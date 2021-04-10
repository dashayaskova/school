import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog
} from '@material-ui/core';

import Table from './Table';
import { createGradeSpace, editGradeSpace, deleteGradeSpace } from '@/actions/subject';

const useStyles = makeStyles({
    paper: { padding: "40px" },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const GradeSpaceDialog = (props) => {
    const classes = useStyles();
    const { onClose, subject, gradeSpaces, setGradeSpaces, filteredGradeSpaces } = props;

    return (
        <Dialog classes={{ paper: classes.paper }} onClose={() => onClose()} open={props.open}>
                <Table
                    title=""
                    columns={[
                        { title: "Тип оцінки", field: 'type', 
                            lookup: { 
                                usual: 'Звичайна',
                                sem1: 'Семестр 1',
                                sem2: 'Семестр 2',
                                year: 'Рік'
                            }, 
                            initialAddValue: 'usual',
                            validate: rowData => Boolean(rowData.type)
                        },
                        { title: "Назва", field: 'name', require: true, validate: rowData => Boolean(rowData.name) },
                        { title: "Дата", 
                            field: 'date', 
                            type: 'date', 
                            initialAddValue: new Date(),
                            validate: rowData => Boolean(rowData.date), 
                        },
                    ]}
                    actions={[
                        {
                            hidden: true,
                        }
                    ]}
                    data={filteredGradeSpaces}
                    editable={{
                        onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            newData.subject = subject.id;
                            createGradeSpace(newData, (res) => { 
                                setGradeSpaces([...gradeSpaces, res]);
                            });
                            resolve();
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            const id = oldData.id;
                            editGradeSpace({ ...newData }, 
                              (resp) => setGradeSpaces(gradeSpaces.map((el) => id !== el.id ? el : resp)));
                            resolve();
                        }),
                        onRowDelete: oldData =>
                            new Promise(async (resolve, reject) => {
                                const id = oldData.id;
                                deleteGradeSpace(id, 
                                    (resp) => setGradeSpaces(gradeSpaces.filter((el) => id !== el.id)));
                                resolve()
                        }),
                    }}
                />
        </Dialog>
    );
}

export default GradeSpaceDialog;
