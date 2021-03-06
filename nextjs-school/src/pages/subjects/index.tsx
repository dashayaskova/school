import React, { useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Box
} from '@material-ui/core';
import _ from 'lodash';
import { 
  SubjectType, 
  GradeType 
} from '@/generated/graphql';
import {
  Map
} from '@/utils/basicTypes'

import Table from '@/components/Table';
import Navbar from '@/components/Navbar'
import GradeSpaceDialog from '@/components/GradeSpaceDialog';
import { createEditGrades } from '@/actions/subject';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1)
    }
}));

type SubjectClassProps = {
  subject: SubjectType,
  grades: GradeType[]
};

type GradeRow = {
  stName: String,
  stId: String,
  [key: string]: any
}

const SubjectClass: FunctionComponent<SubjectClassProps> = (props) => {
    const classes = useStyles();
    const cntMonth = new Date().getUTCMonth() + 1;
    const students = props.subject.class.students;
    const [gradeSpaces, setGradeSpaces] = useState(props.subject.gradeSpaces);
    const [grades, setGrades] = useState(props.grades);
    const [open, setOpen] = useState(false);
    const [semester, setSemester] = useState(cntMonth >= 9 && cntMonth <= 12 ? "sem1" : "sem2");
    const stDict = {} as Map;

    const filteredGradeSpaces = gradeSpaces.filter(el => {
        let month = new Date(el.date).getMonth() + 1;

        switch (semester) {
            case "sem1":
                return month >= 9 && month <= 12;
            case "sem2":
                return month >= 1 && month <= 5;
        }
    });

    const rows = students.map((st, i) => {
        stDict[st.id] = i;
        const res = {
            stName: `${st.surname} ${st.name}`,
            stId: st.id,
        } as GradeRow;
        for (const grSpace of gradeSpaces) {
            res[grSpace.id] = { mark: null };
        }
        return res;
    });

    const gradesColumns = filteredGradeSpaces
        .sort(function (a, b) {
            return Date.parse(a.date) - Date.parse(b.date);
        })
        .map(grSpace => ({
            title: grSpace.name,
            field: `${grSpace.id}.mark`,
        }));

    for (const grade of grades) {
        const row = rows[stDict[grade.student.id]];
        row[grade.gradeSpace.id] = { id: grade.id, mark: grade.mark, type: "grade" };
    }

    const handleEdit = (changes: GradeRow) =>
        new Promise<void>((resolve) => {
            let marksToAdd = [];
            let marksToUpdate = [];
            let marksToRemove: string[] = [];

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

    const handleSemChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSemester(event.target.value as string);
    };

    return (
        <Navbar title={`${props.subject.name} ${props.subject.class.name}`}>
            <div className={classes.buttons}>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={handleSemChange}
                        label="Семестр"
                        value={semester}
                    >
                        <MenuItem value="sem1">Семестр 1</MenuItem>
                        <MenuItem value="sem2">Семестр 2</MenuItem>
                    </Select>
                </FormControl>
                <Box m={1} />
                <Button color={"secondary"} variant={"contained"}
                    onClick={() => setOpen(true)}>Редагувати колонки</Button>
            </div>
            <GradeSpaceDialog
                open={open}
                onClose={() => setOpen(false)}
                gradeSpaces={gradeSpaces}
                setGradeSpaces={setGradeSpaces}
                filteredGradeSpaces={filteredGradeSpaces}
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
