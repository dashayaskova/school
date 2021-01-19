import { serverGraphql, clientGraphql } from '../utils/graphql';

export async function getStudents(surname, onSuccess, onError) {
    const response = await clientGraphql(`
            query($surname: String!) {
                students(surname: $surname) {
                    id
                    name
                    surname
                    patronymic
              }
            }`,
        { surname });

    if (!response) {
        if (onError) onError();
        return;
    }
    
    if (onSuccess) onSuccess(response.students); 
}

export async function getServerStudents(req) {
    const response = await serverGraphql(req, `
            query {
                students {
                    id
                    name
                    surname
                    patronymic
                    birthday
                    registryId
                    email
                    phone
              }
            }`);

    return response.students;
}

export async function addStudentsToClass(classId, students, onSuccess, onError) {
    const response = await clientGraphql(`
        mutation ($classId: String!, $students: [String!]) {
            addStudentsToClass(classId: $classId, students: $students) {
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
        }
      `, { classId, students });

    if (!response) {
        if (onError) onError();
        return;
    }
    
    if (onSuccess) onSuccess(response.addStudentsToClass.students); 
}

export async function removeStudentFromClass(classId, studentId) {
    const response = await clientGraphql(`
        mutation ($classId: String!, $studentId: String!) {
            removeStudentFromClass(classId: $classId, studentId: $studentId) 
        }
      `, { classId, studentId });

    return response.removeStudentFromClass;
}

export async function createStudent(student, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation (
            $name: String!
            $surname: String!
            $patronymic: String!
            $email: String!
            $phone: String!
            $registryId: String!
            $birthday: Date!
          ) {
            createStudent(data: {
              name: $name
              surname: $surname
              patronymic: $patronymic
              email: $email
              phone: $phone
              registryId: $registryId
              birthday: $birthday
            }) {
                id
                name
                surname
                patronymic
                birthday
                email
                phone
                registryId
            }
          }`, student);
    
    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess(response.createStudent);
}

export async function editStudent(student, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation (
            $id: String!
            $name: String!
            $surname: String!
            $patronymic: String!
            $email: String!
            $phone: String!
            $registryId: String!
            $birthday: Date!
          ) {
            editStudent(id: $id, data: {
              name: $name
              surname: $surname
              patronymic: $patronymic
              email: $email
              phone: $phone
              registryId: $registryId
              birthday: $birthday
            }) {
                id
                name
                surname
                patronymic
                birthday
                email
                phone
                registryId
            }
          }`, student);
    
    if (!response) {
        if (onError) onError();
        return;
    }

    if (onSuccess) onSuccess(response.editStudent);
}

export async function deleteStudent(id, onSuccess, onError) {
    const response = await clientGraphql(
        `mutation($id: String!) {
            deleteStudent(id: $id)
        }`,
        { id });

    if (!response) {
        if (onError) onError();
        return;
    }
    
    if (onSuccess) onSuccess(response.deleteStudent);
}