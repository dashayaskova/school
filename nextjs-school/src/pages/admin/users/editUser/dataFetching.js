import { getUser } from '../../../../actions';

export async function getServerSideProps(context) {
    const user = await getUser(context.req, context.query.id);
    return {
        props: {
            user
        }
    }
}
