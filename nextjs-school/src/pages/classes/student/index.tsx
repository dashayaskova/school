import React, { FunctionComponent } from 'react';

import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import { GradeType, StudentType } from '@/generated/graphql';
import { Map } from '@/utils/basicTypes';

type ClassesListProps = {
  student: StudentType,
  grades: GradeType[]
};

const ClassesList: FunctionComponent<ClassesListProps> = (props) => {
  const { student } = props;

  let group = props.grades.reduce((r, a) => {
    r[a.gradeSpace.subject.name] = [...r[a.gradeSpace.subject.name] || [], a];
    return r;
   }, {} as Map);

   const rows = [];

   for(let sub in group) {
        let row = { subject: sub } as Map;

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
