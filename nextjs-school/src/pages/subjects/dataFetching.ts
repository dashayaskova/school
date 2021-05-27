import { getServerSubjectAndGrades } from '@/actions/subject';
import { GetServerSideProps } from 'next';
import { Request } from 'express';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { subject, grades } = await getServerSubjectAndGrades(context.req as Request, 
      context.query.id as string);

    return {
        props: {
            subject,
            grades
        }
    }
}
