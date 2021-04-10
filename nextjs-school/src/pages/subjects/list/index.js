import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { getClassSubjects, createSubject, editSubject, deleteSubject } from '@/actions';
import SearchIcon from '@material-ui/icons/Search';

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

const SubjectsList = (props) => {
  const classes = useStyles();
  const [subjects, setSubjects] = useState([]);
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

  const handleYearChange = (event) => {
    setCntYear(event.target.value);
  };

  const handleClassChange = (event) => {
    setCntClass(event.target.value);
  };

  return (
    <div>
      <Navbar title={"Предмети"}>
        <div className={classes.buttons}>
          <FormControl variant="outlined" className={classes.formControl}>
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
          <FormControl variant="outlined" className={classes.formControl}>
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
          ]}
          data={subjects}
          actions={[
            {
              icon: () => <SearchIcon />,
              tooltip: 'Переглянути',
              onClick: (event, rowData) => {
                Router.push(`/subjects/${rowData.id}/marks`);
              }
            }
          ]}
          editable={{
            ...(cntClass && !access.length && { 
                onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  createSubject({ ...newData, class: cntClass }, 
                      (resp) => setSubjects([...subjects, resp]));
                  resolve();
                }),
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const id = oldData.id;

                editSubject({ ...newData, class: cntClass }, 
                  (resp) => setSubjects(subjects.map((el) => id !== el.id ? el : resp)));

                resolve();
              }),
            onRowDelete: oldData =>
              new Promise(async (resolve, reject) => {
                const id = oldData.id;
                deleteSubject(id, () => setSubjects(subjects.filter((el) => id !== el.id)));
                resolve()
              }),
          }}
        />
      </Navbar>
    </div>
    );
};

export default SubjectsList;
