import { getServerClasses, getServerYears, getUserClasses } from '@/actions';

export async function getServerSideProps(context) {
    const user = context.req.user;

    let classes;
    let classAccess = [];

    if (user.isAdmin) {
        classes = await getServerClasses(context.req);
        classAccess = [];
    }else {
        classAccess = (await getUserClasses(context.req, user.uid)).classAccess;
        classes = classAccess.map(e => e.class);
    }

    const params = await getServerYears(context.req);

    return {
        props: {
            classes,
            params,
            classAccess
        }
    }
}
