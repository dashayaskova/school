import { getServerStudents } from '@/actions/student';
import { GetServerSideProps } from 'next';
import { Request } from 'express';

export const getServerSideProps: GetServerSideProps = async(context) => {
    const students = await getServerStudents(context.req as Request);

    return {
        props: {
            students
        }
    }
}
