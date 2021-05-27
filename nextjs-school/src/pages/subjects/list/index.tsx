import React, { useState, useEffect, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';
import { Column } from 'material-table';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { getClassSubjects, createSubject, editSubject, deleteSubject } from '@/actions';
import SearchIcon from '@material-ui/icons/Search';
import { ClassSubjectsType, ClassType, ParamsType, SubjectType, SubjectInput } from '@/generated/graphql';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginLeft: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  classSelect: {
      width: '100px'
  }
}));

type SubjectsListProps = {
  classes: ClassType[],
  params: ParamsType,
  classAccess: ClassSubjectsType[]
};

const SubjectsList: FunctionComponent<SubjectsListProps> = (props) => {
  const classes = useStyles();
  const [subjects, setSubjects] = useState([] as SubjectType[]);
  const [cntYear, setCntYear] = useState(props.params.currentYear);
  const [cntClass, setCntClass] = useState("");

  let filteredClasses = props.classes.filter(el => el.year === cntYear);

  useEffect(() => {
    setCntClass(filteredClasses[0]?.id || "");
  }, [ cntYear ]);
  
  let access = props.classAccess.find(e => e.class.id == cntClass)?.subjectAccess || [];

  useEffect(() => {
    if(cntClass) {
      (!access.length) ?
        getClassSubjects(cntClass, (subjects) => setSubjects(subjects)) :
        setSubjects(access);
    } else {
      setSubjects([]);
    }
  }, [ cntClass ]);

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCntYear(event.target.value as string);
  };

  const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCntClass(event.target.value as string);
  };

  return (
    <div>
      <Navbar title={"Предмети"}>
        <div className={classes.buttons}>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleYearChange}
              label="Рік"
              value={cntYear}
            >
              {
                props.params.years.map((el) => (<MenuItem key={el} value={el}>{el}</MenuItem>))
              }
            </Select>
          </FormControl>
          <Box m={1} />
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Класс</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleClassChange}
              label="Класс"
              className={classes.classSelect}
              value={cntClass}
            >
                <MenuItem value="">-</MenuItem>
              {
                filteredClasses.map((el) => (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>))
              }
            </Select>
          </FormControl>
        </div>

        <Table
          options={{
            grouping: true
          }}
          title=""
          columns={[
            { title: "Назва", field: 'name', validate: rowData => Boolean(rowData.name) }
          ] as Column<SubjectType>[]}
          data={subjects}
          actions={[
            {
              icon: () => <SearchIcon />,
              tooltip: 'Переглянути',
              onClick: (_: any, rowData: SubjectType) => {
                Router.push(`/subjects/${rowData.id}/marks`);
              }
            }
          ]}
          editable={{
            ...(cntClass && !access.length && { 
                onRowAdd: (newData: SubjectInput) =>
                new Promise<void>((resolve) => {
                  createSubject({ ...newData, class: cntClass }, 
                      (resp) => setSubjects([...subjects, resp]));
                  resolve();
                }),
            }),
            onRowUpdate: (newData: SubjectType, oldData: SubjectType) =>
              new Promise<void>((resolve) => {
                const id = oldData.id;

                editSubject({ ...newData, class: cntClass }, 
                  (resp) => setSubjects(subjects.map((el) => id !== el.id ? el : resp)));

                resolve();
              }),
            onRowDelete: (oldData: SubjectType) =>
              new Promise<void>(async (resolve, reject) => {
                const id = oldData.id;
                deleteSubject(id, () => setSubjects(subjects.filter((el) => id !== el.id)));
                resolve();
              }),
          }}
        />
      </Navbar>
    </div>
    );
};

export default SubjectsList;
