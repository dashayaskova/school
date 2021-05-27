import { getServerClass } from '@/actions';
import { GetServerSideProps } from 'next';
import { Request } from 'express';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const classObj = await getServerClass(context.req as Request, context.query.id as string);

    return {
        props: {
            classObj
        }
    }
}
