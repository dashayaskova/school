import { clientGraphql, serverGraphql } from '../utils/graphql';

export async function getServerSubjectAndGrades(req, id) {

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

export async function createGradeSpace(gradeSpace, onSuccess, onError) {
  const response = await clientGraphql(
    `mutation ($name: String!, $date: Date!, $subject: String!, $type: String!) {
        createGradeSpace(data: {name: $name, date: $date, subject: $subject, type: $type}) {
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

export async function createSubject(subject, onSuccess, onError) {
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

export async function editSubject(subject, onSuccess, onError) {
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

export async function deleteSubject(id, onSuccess, onError) {
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


export async function editGradeSpace(gradeSpace, onSuccess, onError) {
  const response = await clientGraphql(
    `mutation ($name: String!, $date: Date!, $type: String!, , $id: String) {
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

export async function createEditGrades(dataToAdd, dataToEdit, dataToRemove, onSuccess, onError) {
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


export async function deleteGradeSpace(id, onSuccess, onError) {
  const response = await clientGraphql(
    `mutation($id: String!) {
          deleteGradeSpace(id: $id)
      }`,
    { id });

  if (!response) {
    if (onError) onError();
    return;
  }

  if (onSuccess) onSuccess(response.deleteGradeSpace);
}