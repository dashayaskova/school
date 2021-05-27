import { getServerClasses, getServerYears, getUserClasses } from '@/actions';
import { GetServerSideProps } from 'next';
import { IGetUserRequest } from '@/utils/userReq';
import { ClassSubjectsType } from '@/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const req = (context.req as IGetUserRequest);
    const user = req.user!;

    let classes;
    let classAccess: ClassSubjectsType[] = [];

    if (user.isAdmin) {
        classes = await getServerClasses(req);
        classAccess = [];
    }else {
        classAccess = await getUserClasses(req, user.uid);
        classes = classAccess.map(e => e.class);
    }

    const params = await getServerYears(req);

    return {
        props: {
            classes,
            params,
            classAccess
        }
    }
}
