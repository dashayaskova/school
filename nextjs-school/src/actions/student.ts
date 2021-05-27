import { serverGraphql, clientGraphql } from '../utils/graphql';
import { StudentType, StudentInput, GradeType } from '@/generated/graphql';
import { Request } from 'express';

export async function getStudents(surname: string, onSuccess?: (e: StudentType[]) => void, onError?: () => void) {
  const response: { students: StudentType[] } = await clientGraphql(`
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

export async function getServerStudents(req: Request): Promise<StudentType[]> {
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

export async function addStudentsToClass(classId: string, students: String[],
  onSuccess?: (_: StudentType[]) => void, onError?: () => void) {
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

export async function removeStudentFromClass(classId: string, studentId: string): Promise<boolean> {
  const response = await clientGraphql(`
        mutation ($classId: String!, $studentId: String!) {
            removeStudentFromClass(classId: $classId, studentId: $studentId) 
        }
      `, { classId, studentId });

  return response.removeStudentFromClass;
}

export async function createStudent(student: StudentInput, onSuccess?: (_: StudentType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation (
            $name: String!
            $surname: String!
            $patronymic: String
            $email: String
            $phone: String
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

export async function editStudent(student: StudentInput, onSuccess?: (_: StudentType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation (
            $id: String!
            $name: String!
            $surname: String!
            $patronymic: String
            $email: String
            $phone: String
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

export async function deleteStudent(id: string, onSuccess?: () => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation($id: String!) {
            deleteStudent(id: $id)
        }`,
    { id });

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess();
}

export async function getStudentGrades(classId: string, studentId: string, req: Request):
  Promise<{
    studentGrades: GradeType[],
    student: StudentType
  }> {
  const response = await serverGraphql(req, `query ($studentId: String!,
            $classId: String!) {
                studentGrades(studentId: $studentId, classId: $classId) {
                    id
                    mark
                    student {
                    id
                    name
                    }
                    gradeSpace {
                    id
                    type
                    subject {
                        name
                    }
                }
            }
            student(id: $studentId) {
                id
                name
                surname
            }
        }`, { classId, studentId });

  return response;
}