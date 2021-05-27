import { serverGraphql, clientGraphql } from '../utils/graphql';
import { Request } from 'express';
import { UserType, ClassSubjectsType } from '@/generated/graphql';
import { FullUser } from '@/utils/userReq';

export async function getUsers(req: Request): Promise<UserType[]> {
    const data = await serverGraphql(req, `
        { 
            users { 
                id
                isAdmin
                name
                email
                uid
                classAccess {
                    class {
                        id
                        name
                    }
                    subjectAccess {
                        id
                        name
                    }
                }
            } 
        }`);

    return data.users;
}

export async function getTeachers(req: Request): Promise<UserType[]> {
    const data = await serverGraphql(req, `
        query {
            teachers { 
                id
                name
                email
            } 
        }`);
    return data.teachers;
}

export async function getUser(req: Request, id: string): Promise<UserType> {
    const data = await serverGraphql(req, `
            query($id: String!) {
                user(id: $id) {
                    id
                    name
                    isAdmin
                    email
                    uid
                    classAccess {
                        class {
                            id
                            name
                            year
                        }
                        subjectAccess {
                            id
                            name
                        }
                    }
              }
            }`,
        { id });

    return data.user;
}

export async function getUserClasses(req: Request, uid: string): Promise<ClassSubjectsType[]> {
    const data = await serverGraphql(req, `
            query($uid: String!) {
                userByUid(uid: $uid) {
                    id
                    classAccess {
                        class {
                            id
                            name
                            year
                        }
                        subjectAccess {
                            id
                            name
                            class {
                                id
                            }
                        }
                    }
              }
            }`,
        { uid });

    return data.userByUid?.classAccess || [];
}

export async function deleteUser(id: string, onSuccess?: () => Promise<void>) {
    const response = await clientGraphql(
        `mutation($id: String!) {
            deleteUser(id: $id)
        }`,
        { id });

    if (response.deleteUser && onSuccess)
        onSuccess();

    return response.deleteUser;
}

export async function addUser(user: FullUser, onSuccess: () => void, onError: () => void) {
    const body = {
        ...user,
        classAccess: user.classAccess.map(e1 => 
            ({ 
                classId: e1.class.id, 
                subjectAccess: e1.subjectAccess.map(e2 => e2.id)
            })
        )
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
            $classAccess: [ClassSubjectsInput]
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
                class {
                    id
                    name
                    year
                }
                subjectAccess {
                    name
                }
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

export async function editUser(user: UserType, onSuccess: () => void, onError: () => void) {
    let u = {...user, classAccess: user.classAccess.map(e1 => 
        ({ 
            classId: e1.class.id, 
            subjectAccess: e1.subjectAccess.map(e2 => e2.id)
        })
    )};

    //TODO add sync with firebase if isAdmin property was changed

    const response = await clientGraphql(
        `mutation (
            $id: String!
            $name: String!
            $isAdmin: Boolean!
            $classAccess: [ClassSubjectsInput]
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
                class {
                    id
                    name
                    year
                }
                subjectAccess {
                    name
                }
            }
        }
    }`, 
        u);
    
    if (!response) {
        if (onError) onError();
        return;
    }
    if (onSuccess) onSuccess();
}
