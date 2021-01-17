import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
} from '@material-ui/core';
import _ from 'lodash';

import Table from '../../../components/Table';
import Navbar from '../../../components/Navbar'
import GradeSpaceDialog from '../../../components/GradeSpaceDialog';
import { createEditGrades } from '@/actions/subject';

const useStyles = makeStyles((theme) => ({
    addStudent: {
        marginLeft: 'auto',
        marginBottom: theme.spacing(1)
    }
}));

const SubjectClass = (props) => {
    const classes = useStyles();
    const students = props.subject.class.students;
    const [gradeSpaces, setGradeSpaces] = useState(props.subject.gradeSpaces);
    const [grades, setGrades] = useState(props.grades);
    const [open, setOpen] = useState(false);
    const stDict = {};

    const rows = students.map((st, i) => {
        stDict[st.id] = i;
        const res = {
            stName: `${st.surname} ${st.name}`,
            stId: st.id,
        };
        for (const grSpace of gradeSpaces) {
            res[grSpace.id] = { mark: null };
        }
        return res;
    });

    //TODO checks whether it works okay
    const gradesColumns = gradeSpaces
        .sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })
        .map(grSpace => ({
        title: grSpace.name,
        field: `${grSpace.id}.mark`,
    }));

    for (const grade of grades) {
        const row = rows[stDict[grade.student.id]];
        row[grade.gradeSpace.id] = { id: grade.id, mark: grade.mark, type: "grade" };
    }

    const  handleEdit = (changes) =>
        new Promise((resolve, reject) => {
            console.log(changes)
            let marksToAdd = [];
            let marksToUpdate = [];
            let marksToRemove = [];

            for (let index in changes) {
                let r = changes[index];
                let newData = r.newData;
                let oldData = r.oldData;
                for (let gradeSpaceId in newData) {
                    if (!newData[gradeSpaceId].id && newData[gradeSpaceId].mark) {
                        marksToAdd.push({
                            mark: newData[gradeSpaceId].mark,
                            student: oldData.stId,
                            gradeSpace: gradeSpaceId
                        })
                    }

                    if (newData[gradeSpaceId].id && newData[gradeSpaceId].mark
                        && newData[gradeSpaceId].mark !== oldData[gradeSpaceId].mark) {
                        marksToUpdate.push({
                            id: newData[gradeSpaceId].id,
                            mark: newData[gradeSpaceId].mark,
                        })
                    }

                    if (newData[gradeSpaceId].id && !newData[gradeSpaceId].mark 
                        && newData[gradeSpaceId].mark !== oldData[gradeSpaceId].mark) {
                        marksToRemove.push(newData[gradeSpaceId].id);
                    }
                }
            }

            createEditGrades(marksToAdd, marksToUpdate, marksToRemove, (response) => {
                const newGrades = _.cloneDeep(grades.filter(g => !marksToRemove.includes(g.id)));
                var merged = _.merge(_.keyBy(newGrades, 'id'), _.keyBy(response.editGrades, 'id'));
                var values = _.values(merged);
                setGrades([
                    ...values,
                    ...response.createGrades
                ]);
                resolve();
            });
        });
    
    const handleSemChange = (event) => {
        switch(event.target.value) {
            case "sem1":

        }
    };

    return (
        <Navbar title={props.subject.name}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleSemChange}
                label="Рік"
                value=""
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="sem1">Семестр 1</MenuItem>
                    <MenuItem value="sem2">Семестр 2</MenuItem>
                </Select>
          </FormControl>
            <Button className={classes.addStudent} color={"secondary"} variant={"contained"}
                onClick={() => setOpen(true)}>Редагувати колонки</Button>
            <GradeSpaceDialog
                open={open}
                onClose={() => setOpen(false)}
                gradeSpaces={gradeSpaces}
                setGradeSpaces={setGradeSpaces}
                subject={props.subject}
            />
            <Table
                title="Оцінки"
                columns={[
                    { title: "Прізвище", field: 'stName', editable: 'never' },
                    ...gradesColumns
                ]}
                options={{
                    grouping: true
                }}
                data={rows}
                actions={[
                    {
                        hidden: true,
                    }
                ]}
                editable={{
                    onBulkUpdate: handleEdit
                }}
            />
        </Navbar>
    );
};

export default SubjectClass;
