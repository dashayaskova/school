import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { editClass, addClass, deleteClass } from '@/actions';
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
  }
}));

const ClassesList = (props) => {
  const classes = useStyles();
  const years = props.params.years;
  const [cntYear, setCntYear] = useState(props.params.currentYear);
  const [classesObj, setClasses] = useState(props.classes);
  const filteredClasses = classesObj.filter(el => el.year === cntYear);

  const handleChange = (event) => {
    setCntYear(event.target.value);
  };

  return (
    <div>
      <Navbar title={"Класи"}>
        <div className={classes.buttons}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChange}
              label="Рік"
              defaultValue={cntYear}
            >
              {
                years.map((el) => (<MenuItem key={el} value={el}>{el}</MenuItem>))
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
            { title: "Ім'я", field: 'name', validate: rowData => Boolean(rowData.name) },
            { title: 'Рік', field: 'year', lookup: years.reduce((acc, curr) => (acc[curr] = curr, acc), {}), validate: rowData => Boolean(rowData.year) },
            // { title: 'ФІО вчителя', field: 'currentTeacher.id', lookup: teachers.reduce((acc,curr) => (acc[curr.id] = curr.name,acc),{})  }
          ]}
          data={filteredClasses}
          actions={[
            {
              icon: () => <SearchIcon />,
              tooltip: 'Переглянути',
              onClick: (event, rowData) => {
                Router.push(`/classes/${rowData.id}`);
              }
            }
          ]}
          editable={{
            ...(props.user.isAdmin && { onRowAdd: newData =>
              new Promise((resolve, reject) => {
                addClass({ ...newData },
                  (resp) => setClasses([...classesObj, resp]));

                resolve();
              }),
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const id = oldData.id;

                editClass({ ...newData },
                  (resp) => setClasses(classesObj.map((el) => id !== el.id ? el : resp)));

                resolve();
              }),
            onRowDelete: oldData =>
              new Promise(async (resolve, reject) => {
                const id = oldData.id;
                deleteClass(id, (resp) => setClasses(classesObj.filter((el) => id !== el.id)));
                resolve()
              }),
          }}
        />
      </Navbar>
    </div>
    );
};

export default ClassesList;
