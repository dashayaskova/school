import { clientGraphql, serverGraphql } from '../utils/graphql';
import { ClassType, ClassInput, SubjectType, ParamsType } from '@/generated/graphql';
import { Request } from 'express';

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

export async function getServerClasses(req: Request): Promise<ClassType[]> {
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

export async function getServerClass(req: Request, id: string): Promise<ClassType> {
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

export async function getClassSubjects(id: string, onSuccess?: (e: SubjectType[]) => void, onError?: () => void) {
    const response: {class: ClassType} | undefined = await clientGraphql(`
        query ($id: String!) { 
            class (id: $id) { 
                id
                subjects {
                    id
                    name
                    class {
                      id
                    }
                }
            } 
        }`, { id });

    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess(response.class.subjects);
}

export async function getServerYears(req: Request): Promise<ParamsType> {
    const data = await serverGraphql(req,
        `query { 
            params { 
                years
                currentYear
            } 
        }`);

    return data.params;
}

export async function deleteClass(id: string, onSuccess?: () => void, onError?: () => void) {
    const response = await clientGraphql(
        `mutation($id: String!) {
            deleteClass(id: $id)
        }`,
        { id });

    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess();
}

export async function editClass(classObj: ClassInput, onSuccess?: (e: ClassType) => void, onError?: () => void) {
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

export async function addClass(classObj: ClassInput, onSuccess?: (e: ClassType) => void, onError?: () => void) {
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