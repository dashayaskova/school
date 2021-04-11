import { getServerClasses, getServerYears, getTeachers, getUserClasses } from '@/actions';

export async function getServerSideProps(context) {
    const user = context.req.user;
    const classes = user.isAdmin 
        ? await getServerClasses(context.req) : 
        (await getUserClasses(context.req, user.uid)).classAccess.map(e => e.class);

    const params = await getServerYears(context.req);

    return {
        props: {
            classes,
            params
        }
    }
}
