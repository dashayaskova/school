import { clientGraphql, serverGraphql } from '../utils/graphql';

export async function getClasses() {
    const response = await clientGraphql(
        `query { 
            classes { 
                name
                id
                subjects {
                    id
                    name
                }
            } 
        }`)
    
    return response.classes;
}

export async function getServerClasses(req) {
    const data = await serverGraphql(req, 
        `query { 
            classes { 
                name
                id
                year
                subjects {
                    id
                    name
                }
            } 
        }`);
        
    return data.classes;
}

export async function getServerClass(req, id) {

    const data = await serverGraphql(req, 
        `query ($id: String!) { 
            class (id: $id) { 
                name
                id
                year
                students {
                    id
                    name
                    surname
                    patronymic
                    birthday
                    email
                    phone
                    registryId
                }
            } 
        }`, { id: id });

    return data.class;
}

export async function getServerYears(req) {
    const data = await serverGraphql(req, 
        `query { 
            params { 
                years
                currentYear
            } 
        }`);

    return data.params;
}

export async function deleteClass(id, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation($id: String!) {
            deleteClass(id: $id)
        }`,
        { id });

    if (!response) {
        if (onError) onError();
        return;
    }
    
    if (onSuccess) onSuccess(response.deleteClass);
}

export async function editClass(classObj, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation (
            $id: String!
            $name: String!
            $year: String!
          ) {
            editClass(id: $id, data: {
              name: $name
              year: $year
            }) {
              id
              year
              name
            }
          }`, classObj);
    
    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess(response.editClass);
}

export async function addClass(classObj, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation (
            $name: String!
            $year: String!
          ) {
            createClass(data: {
              name: $name
              year: $year
            }) {
              id
              year
              name
            }
          }`, classObj);
    
    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess(response.createClass);
}