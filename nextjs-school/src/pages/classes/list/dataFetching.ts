import { getServerClasses, getServerYears, getUserClasses } from '@/actions';
import { GetServerSideProps } from 'next';
import { IGetUserRequest } from '../../../utils/userReq';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const request = context.req as IGetUserRequest;
    const user = request.user!;
    const classes = user.isAdmin 
        ? await getServerClasses(request) : 
        (await getUserClasses(request, user.uid)).map(e => e.class);

    const params = await getServerYears(request);

    return {
        props: {
            classes,
            params
        }
    }
}
