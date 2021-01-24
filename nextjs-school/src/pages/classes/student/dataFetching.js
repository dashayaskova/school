import { getStudentGrades } from '@/actions';

export async function getServerSideProps(context) {
    const response = await getStudentGrades(context.query.id, context.query.studentId, context.req);

    return {
        props: {
            grades: response.studentGrades,
            student: response.student
        }
    }
}
