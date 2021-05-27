import React, { useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Column } from 'material-table';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { editClass, addClass, deleteClass } from '@/actions';
import SearchIcon from '@material-ui/icons/Search';
import { ClassType, ParamsType, ClassInput } from '@/generated/graphql'
import { User } from '@/utils/userReq'
import { Map } from '@/utils/basicTypes'

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

type ClassesListProps = {
  classes: ClassType[],
  params: ParamsType,
  user: User
};

const ClassesList: FunctionComponent<ClassesListProps> = (props) => {
  const classes = useStyles();
  const years = props.params.years;
  const [cntYear, setCntYear] = useState(props.params.currentYear);
  const [classesObj, setClasses] = useState(props.classes);
  const filteredClasses = classesObj.filter(el => el.year === cntYear);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCntYear(event.target.value as string);
  };

  return (
    <div>
      <Navbar title={"Класи"}>
        <div className={classes.buttons}>
          <FormControl variant="outlined">
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
            { title: "Ім'я", 
              field: 'name', 
              validate: rowData => Boolean(rowData.name) 
            },
            { 
              title: 'Рік', 
              field: 'year', 
              lookup: years.reduce((acc, curr) => (acc[curr] = curr, acc), {} as Map), 
              validate: rowData => Boolean(rowData.year) 
            },
          ] as Column<ClassType>[]}
          data={filteredClasses}
          actions={[
            {
              icon: () => <SearchIcon />,
              tooltip: 'Переглянути',
              onClick: (_: any, rowData: ClassType) => {
                Router.push(`/classes/${rowData.id}`);
              }
            }
          ]}
          editable={{
            ...(props.user.isAdmin && { 
              onRowAdd: (newData: ClassInput) =>
                new Promise<void>((resolve) => {
                  addClass(newData,
                    (resp) => setClasses([...classesObj, resp]));
                  resolve();
                }),
              onRowUpdate: (newData: ClassType, oldData: ClassType) =>
                new Promise<void>((resolve) => {
                  const id = oldData.id;
                  editClass(newData,
                    (resp) => setClasses(classesObj.map((el) => id !== el.id ? el : resp)));
                  resolve();
                }),
              onRowDelete: (oldData: ClassType) => 
                new Promise<void>(async (resolve) => {
                  const id = oldData.id;
                  deleteClass(id, () => setClasses(classesObj.filter((el) => id !== el.id)));
                  resolve();
                }),
              }
            ),
          }}
        />
      </Navbar>
    </div>
    );
};

export default ClassesList;
