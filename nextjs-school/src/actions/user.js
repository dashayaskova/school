import { serverGraphql, clientGraphql } from '../utils/graphql';

export async function getUsers(req) {
    const data = await serverGraphql(req, `
        { 
            users { 
                id
                isAdmin
                name
                email
                classAccess {
                    id
                    name
                }
            } 
        }`);
    return data.users;
}

export async function getUser(req, id) {
    const data = await serverGraphql(req, `
            query ($id: String!){
                user(id: $id) {
                    id
                    name
                    isAdmin
                    email
                    uid
                    classAccess {
                        id
                        name
                    }
              }
            }`,
        { id: id });
    return data.user;
}

export async function deleteUser(id) {
    const response = await clientGraphql(
        `mutation($id: String!) {
            deleteUser(id: $id)
        }`,
        { id });

    return response.deleteUser;
}

export async function addUser(user, onSuccess, onError) {
    const body = {
        ...user,
        classAccess: user.classAccess.map(el => el.id),
    };

    const res = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
    });

    if (res.status !== 200) {
        if (onError) onError();
        return;
    }

    body.uid = (await res.json()).uid;
    const gql_res = await clientGraphql(
        `mutation (
            $name: String!
            $isAdmin: Boolean!
            $classAccess: [String!]!
            $email: String!
            $uid: String!
          ) {
            createUser(data: {
              name: $name
              isAdmin: $isAdmin
              classAccess: $classAccess
              email: $email
              uid: $uid
            }) {
              id
              isAdmin
              name
              email
              classAccess {
                id
                name
              }
            }
          }
        `, body);
    if (!gql_res) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess();
}

export async function editUser(user, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation (
            $id: String!
            $name: String!
            $isAdmin: Boolean!
            $classAccess: [String!]!
            $email: String!
            $uid: String!
          ) {
            editUser(id: $id, data: {
              name: $name
              isAdmin: $isAdmin
              classAccess: $classAccess
              email: $email
              uid: $uid
            }) {
              id
              isAdmin
              name
              email
              classAccess {
                id
                name
              }
            }
          }`, 
        {...user, classAccess: user.classAccess.map(el => el.id) });
    
    if (!response) {
        if (onError) onError();
        return;
    }
    if (onSuccess) onSuccess();
}
