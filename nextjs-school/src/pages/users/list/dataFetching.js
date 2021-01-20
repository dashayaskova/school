import { getUsers } from '@/actions';

export async function getServerSideProps(context) {
    const teachers = await getUsers(context.req);
    
    return {
        props: {
            teachers
        }
    }
}
