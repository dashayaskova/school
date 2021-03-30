import { getUser, getServerYears, getServerClasses } from '@/actions';

export async function getServerSideProps(context) {
    const params = await getServerYears(context.req);
    const currentUser = await getUser(context.req, context.query.id);
    const classes = await getServerClasses(context.req);
    return {
        props: {
            currentUser,
            params,
            classes
        }
    }
}
