import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box } from '@material-ui/core';
import Table from './Table';
import Router from 'next/router'
import {
    Dialog,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { getStudents, addStudentsToClass } from '@/actions/student';

const useStyles = makeStyles({
    paper: { padding: "40px" },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '30px'
    },
    createBtn: {
        width: '200px',
        marginLeft: 'auto',
        marginBottom: '10px'
    }
});

const StudentsDialog = (props) => {
    const classes = useStyles();
    const { onClose, open, classObj, setClass} = props;
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [surname, setSurname] = useState("");

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleFind = () => {
        getStudents(
            surname, 
            (students) => setFilteredStudents(
                students.filter(s => !classObj.students.map(el => el.id).includes(s.id)))
        );
    };

    const handleSubmit = (el) => {
        addStudentsToClass(
            classObj.id, 
            [el.id],
            (students) => { 
                setClass({...classObj, students: students }); 
                onClose();
                setSurname("");
                setFilteredStudents([]);
             }
        );
    };

    return (
        <Dialog classes={{ paper: classes.paper }} onClose={() => onClose()} open={open}>
            <Button onClick={() => Router.push(`/students`)} className={classes.createBtn} variant={"contained"} autoFocus color="secondary">
                Створити учня
            </Button>
            <div className={classes.row}>
                <TextField
                    label="Введіть прізвище учня"
                    type="text"
                    value={surname}
                    onChange={handleSurnameChange}
                />
                <Button variant={"contained"} autoFocus color="secondary" onClick={handleFind}>
                    Шукати
                </Button>
            </div>

            {
                filteredStudents.map((el) => (
                    <ListItem onClick={() => handleSubmit(el)} button key={el.id}>
                        <ListItemText primary={`${el.surname} ${el.name} ${el.patronymic}`} />
                    </ListItem>
                ))
            }

        </Dialog>
    );
}

export default StudentsDialog;
