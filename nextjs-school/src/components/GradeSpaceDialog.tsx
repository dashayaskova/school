import React, { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog
} from '@material-ui/core';
import { Column } from 'material-table';

import Table from './Table';
import { createGradeSpace, editGradeSpace, deleteGradeSpace } from '@/actions/subject';
import { GradeSpaceType, SubjectType, GradeSpaceInput } from '@/generated/graphql';

const useStyles = makeStyles({
    paper: { padding: "40px" },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
});

type GradeSpaceDialogProps = {
  open: boolean,
  onClose: () => void,
  gradeSpaces: GradeSpaceType[],
  setGradeSpaces: Dispatch<SetStateAction<GradeSpaceType[]>>,
  filteredGradeSpaces: GradeSpaceType[],
  subject: SubjectType
};

const GradeSpaceDialog: FunctionComponent<GradeSpaceDialogProps> = (props) => {
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
                            initialEditValue: new Date(), //TODO check
                            validate: rowData => Boolean(rowData.date), 
                        },
                    ] as Column<GradeSpaceType>[]}
                    actions={[
                        {
                            hidden: true,
                        }
                    ]}
                    data={filteredGradeSpaces}
                    editable={{
                        onRowAdd: (newData: GradeSpaceInput) =>
                        new Promise<void>((resolve, reject) => {
                            newData.subject = subject.id;
                            newData.class = subject.class.id;
                            createGradeSpace(newData, (res) => { 
                                setGradeSpaces([...gradeSpaces, res]);
                            });
                            resolve();
                        }),
                        onRowUpdate: (newData: GradeSpaceType, oldData: GradeSpaceType) =>
                        new Promise<void>((resolve, reject) => {
                            const id = oldData.id;
                            editGradeSpace(newData as any, 
                              (resp) => setGradeSpaces(gradeSpaces.map((el) => id !== el.id ? el : resp)));
                            resolve();
                        }),
                        onRowDelete: (oldData: GradeSpaceType) =>
                            new Promise<void>(async (resolve, reject) => {
                                const id = oldData.id;
                                deleteGradeSpace(id, 
                                    () => setGradeSpaces(gradeSpaces.filter((el) => id !== el.id)));
                                resolve()
                        }),
                    }}
                />
        </Dialog>
    );
}

export default GradeSpaceDialog;
