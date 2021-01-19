import { getServerClasses, getServerYears, getTeachers } from '@/actions';

export async function getServerSideProps(context) {
    const classes = await getServerClasses(context.req);
    const params = await getServerYears(context.req);
    const teachers = await getTeachers(context.req);
    return {
        props: {
            classes,
            params,
            teachers
        }
    }
}
