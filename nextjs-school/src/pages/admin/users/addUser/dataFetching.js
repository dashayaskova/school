import { getUser, getServerYears, getServerClasses } from '@/actions';

export async function getServerSideProps(context) {
    const params = await getServerYears(context.req);
    const classes = await getServerClasses(context.req);
    return {
        props: {
            params,
            classes
        }
    }
}
