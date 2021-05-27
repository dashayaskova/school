import { getStudentGrades } from '@/actions';
import { GetServerSideProps } from 'next';
import { Request } from 'express';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await getStudentGrades(context.query.id as string,
       context.query.studentId as string, context.req as Request);

    return {
        props: {
            grades: response.studentGrades,
            student: response.student
        }
    }
}
