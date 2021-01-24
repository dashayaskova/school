import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
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
  const { student } = props;

  let group = props.grades.reduce((r, a) => {
    r[a.gradeSpace.subject.name] = [...r[a.gradeSpace.subject.name] || [], a];
    return r;
   }, {});

   const rows = [];

   for(let sub in group) {
        let row = { "subject": sub };

        for(let grade of group[sub]) {
            row[grade.gradeSpace.type] = grade.mark;
        }

        rows.push(row);
   }

  return (
    <div>
      <Navbar title={`${student.surname} ${student.name} - Табель`}>
        <Table
          title=""
          options={{
            exportButton: true,
            grouping: false
          }}
          columns={[
            { title: "Предмет", field: 'subject' },
            { title: "Семестр 1", field: 'sem1' },
            { title: "Семестр 2", field: 'sem2' },
            { title: "Рік", field: 'year' },
          ]}
          data={rows}
        />
      </Navbar>
    </div>
    );
};

export default ClassesList;
