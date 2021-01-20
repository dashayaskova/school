import { getServerClass } from '@/actions';

export async function getServerSideProps(context) {
    const classObj = await getServerClass(context.req, context.query.id);

    return {
        props: {
            classObj
        }
    }
}
