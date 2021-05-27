import { getUsers } from '@/actions';
import { GetServerSideProps } from 'next';
import { IGetUserRequest } from '@/utils/userReq';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const teachers = await getUsers(context.req as IGetUserRequest);
    
    return {
        props: {
            teachers
        }
    }
}
