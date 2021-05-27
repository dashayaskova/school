import { clientGraphql, serverGraphql } from '../utils/graphql';
import { 
  GradeInput, 
  GradeSpaceInput, 
  GradeSpaceType, 
  SubjectInput, 
  SubjectType, 
  GradeType 
} from '@/generated/graphql';
import { Request } from 'express';

export async function getServerSubjectAndGrades(req: Request, id: string) : 
  Promise<{
    subject: SubjectType,
    grades: GradeType[]
  }> {
  const data = await serverGraphql(req,
    `query ($id: String!) {
            subject(id: $id) {
              id
              name
              gradeSpaces {
                id
                type
                name
                date
              }
              class {
                id
                name
                students {
                  id
                  name
                  surname
                  birthday
                }
              }
            }
            grades(id: $id) {
              id
              student {
                id
                name
              }
              mark
              gradeSpace {
                id
              }
            }
          }`, { id: id });

  return data;
}

export async function createGradeSpace(gradeSpace: GradeSpaceInput, onSuccess?: (_: GradeSpaceType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($name: String!, $date: Date!, $subject: String!, $type: String!, $class: String!,) {
        createGradeSpace(data: {name: $name, date: $date, subject: $subject, type: $type, class: $class}) {
          id
          name
          type
          date
          subject {
            id
            name
          }
        }
      }`, gradeSpace);

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response.createGradeSpace);
}

export async function createSubject(subject: SubjectInput, onSuccess?: (_: SubjectType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($name: String!, $class: String!) {
      createSubject(data: {name: $name, class: $class}) {
        id
        name
        class {
          id
        }
      }
    }
    `, subject);

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response.createSubject);
}

export async function editSubject(subject: SubjectInput, onSuccess?: (_: SubjectType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($name: String!, $class: String!, $id: String!) {
      editSubject (data: {name: $name, class: $class}, id: $id) {
        id
        name
      }
    }    
    `, subject);

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response.editSubject);
}

export async function deleteSubject(id: string, onSuccess?: () => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($id: String!) {
      deleteSubject (id: $id)
    }`,
    { id });

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess();
}


export async function editGradeSpace(gradeSpace: GradeSpaceInput, onSuccess?: (_: GradeSpaceType) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($name: String!, $date: Date!, $type: String!, $id: String) {
        editGradeSpace(data: {name: $name, date: $date, type: $type, id: $id}) {
          id
          name
          type
          date
          subject {
            id
            name
          }
        }
      }`, gradeSpace);

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response.editGradeSpace);
}

export async function createEditGrades(dataToAdd: GradeInput[], dataToEdit: GradeInput[], dataToRemove: String[], 
  onSuccess?: (_: { 
    createGrades: GradeType[],
    editGrades: GradeType[],
    removeGrades: boolean
  }) => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation ($dataToAdd: [GradeInput], $dataToEdit: [GradeInput], $dataToRemove: [String]) {
        createGrades (data: $dataToAdd) {
          id
          gradeSpace {
            id
            date
          }
          mark
          student {
            id
            name
          }
        }
        editGrades (data: $dataToEdit) {
          id
          gradeSpace {
            id
            date
          }
          mark
          student {
            id
            name
          }
        } 
        removeGrades (data: $dataToRemove) 
      }`, { dataToAdd, dataToEdit, dataToRemove });


  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response);

  return response;
}


export async function deleteGradeSpace(id: string, onSuccess?: () => void, onError?: () => void) {
  const response = await clientGraphql(
    `mutation($id: String!) {
          deleteGradeSpace(id: $id)
      }`,
    { id });

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess();
}