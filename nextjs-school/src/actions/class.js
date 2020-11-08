import { clientGraphql } from '../utils/graphql';

export async function getClasses() {
    const response = await clientGraphql(
        `query { 
            classes { 
                name
                id
            } 
        }`)
    
    return response.classes;
}