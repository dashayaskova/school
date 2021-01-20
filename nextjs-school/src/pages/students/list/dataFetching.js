import { getServerStudents } from '@/actions/student';

export async function getServerSideProps(context) {
    const students = await getServerStudents(context.req);

    return {
        props: {
            students
        }
    }
}
