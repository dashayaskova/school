import { getServerYears, getServerClasses } from '@/actions';
import { GetServerSideProps } from 'next';
import { Request } from 'express';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const request = context.req as Request;
    const params = await getServerYears(request);
    const classes = await getServerClasses(request);
    return {
        props: {
            params,
            classes
        }
    }
}
