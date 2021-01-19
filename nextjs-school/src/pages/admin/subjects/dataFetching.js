import { getServerSubjectAndGrades } from '@/actions/subject';

export async function getServerSideProps(context) {
    const { subject, grades } = await getServerSubjectAndGrades(context.req, context.query.id);

    return {
        props: {
            subject,
            grades
        }
    }
}
