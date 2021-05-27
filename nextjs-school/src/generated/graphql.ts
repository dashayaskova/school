export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  DateTimeOffset: any;
  Decimal: any;
  Milliseconds: any;
  Seconds: any;
};

export type ClassInput = {
  name: Scalars['String'];
  year: Scalars['String'];
};

export type ClassSubjectsInput = {
  classId: Scalars['String'];
  subjectAccess: Array<Scalars['String']>;
};

export type ClassSubjectsType = {
  __typename?: 'ClassSubjectsType';
  class: ClassType;
  subjectAccess: Array<SubjectType>;
};

export type ClassType = {
  __typename?: 'ClassType';
  id: Scalars['ID'];
  name: Scalars['String'];
  students: Array<StudentType>;
  subjects: Array<SubjectType>;
  year: Scalars['String'];
};





export type GradeInput = {
  id?: Maybe<Scalars['String']>;
  mark: Scalars['Int'];
  student?: Maybe<Scalars['String']>;
  gradeSpace?: Maybe<Scalars['String']>;
};

export type GradeSpaceInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  date: Scalars['Date'];
  subject?: Maybe<Scalars['String']>;
  class?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type GradeSpaceType = {
  __typename?: 'GradeSpaceType';
  date: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  subject: SubjectType;
  type: Scalars['String'];
};

export type GradeType = {
  __typename?: 'GradeType';
  gradeSpace: GradeSpaceType;
  id: Scalars['ID'];
  mark: Scalars['Int'];
  student: StudentType;
};

export type Mutation = {
  __typename?: 'Mutation';
  addStudentsToClass: ClassType;
  createClass: ClassType;
  createGrades: Array<GradeType>;
  createGradeSpace: GradeSpaceType;
  createStudent: StudentType;
  createSubject: SubjectType;
  createUser: UserType;
  deleteClass: Scalars['Boolean'];
  deleteGradeSpace: Scalars['Boolean'];
  deleteStudent: Scalars['Boolean'];
  deleteSubject: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  editClass: ClassType;
  editGrades: Array<GradeType>;
  editGradeSpace: GradeSpaceType;
  editStudent: StudentType;
  editSubject: SubjectType;
  editUser: UserType;
  removeGrades: Scalars['Boolean'];
  removeStudentFromClass: Scalars['Boolean'];
};


export type MutationAddStudentsToClassArgs = {
  classId: Scalars['String'];
  students?: Maybe<Array<Scalars['String']>>;
};


export type MutationCreateClassArgs = {
  data: ClassInput;
};


export type MutationCreateGradesArgs = {
  data?: Maybe<Array<Maybe<GradeInput>>>;
};


export type MutationCreateGradeSpaceArgs = {
  data: GradeSpaceInput;
};


export type MutationCreateStudentArgs = {
  data: StudentInput;
};


export type MutationCreateSubjectArgs = {
  data: SubjectInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteClassArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGradeSpaceArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationEditClassArgs = {
  data: ClassInput;
  id: Scalars['String'];
};


export type MutationEditGradesArgs = {
  data?: Maybe<Array<Maybe<GradeInput>>>;
};


export type MutationEditGradeSpaceArgs = {
  data: GradeSpaceInput;
};


export type MutationEditStudentArgs = {
  data: StudentInput;
  id: Scalars['String'];
};


export type MutationEditSubjectArgs = {
  data: SubjectInput;
  id: Scalars['String'];
};


export type MutationEditUserArgs = {
  data: UserInput;
  id: Scalars['String'];
};


export type MutationRemoveGradesArgs = {
  data?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationRemoveStudentFromClassArgs = {
  classId: Scalars['String'];
  studentId: Scalars['String'];
};

export type ParamsType = {
  __typename?: 'ParamsType';
  currentYear: Scalars['String'];
  id: Scalars['ID'];
  years: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  class?: Maybe<ClassType>;
  classes: Array<ClassType>;
  grades: Array<GradeType>;
  params?: Maybe<ParamsType>;
  student?: Maybe<StudentType>;
  studentGrades: Array<GradeType>;
  students: Array<StudentType>;
  subject?: Maybe<SubjectType>;
  subjects: Array<SubjectType>;
  teachers: Array<UserType>;
  user?: Maybe<UserType>;
  userByUid?: Maybe<UserType>;
  users: Array<UserType>;
};


export type QueryClassArgs = {
  id: Scalars['String'];
};


export type QueryGradesArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryStudentArgs = {
  id: Scalars['String'];
};


export type QueryStudentGradesArgs = {
  studentId?: Maybe<Scalars['String']>;
  classId?: Maybe<Scalars['String']>;
};


export type QueryStudentsArgs = {
  surname?: Maybe<Scalars['String']>;
};


export type QuerySubjectArgs = {
  id: Scalars['String'];
};


export type QuerySubjectsArgs = {
  classId: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserByUidArgs = {
  uid: Scalars['String'];
};


export type StudentInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  patronymic?: Maybe<Scalars['String']>;
  birthday: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  registryId: Scalars['String'];
};

export type StudentType = {
  __typename?: 'StudentType';
  birthday: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  patronymic?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  registryId: Scalars['String'];
  surname: Scalars['String'];
};

export type SubjectInput = {
  name: Scalars['String'];
  class: Scalars['String'];
};

export type SubjectType = {
  __typename?: 'SubjectType';
  class: ClassType;
  gradeSpaces: Array<GradeSpaceType>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  classAccess?: Maybe<Array<Maybe<ClassSubjectsInput>>>;
  email: Scalars['String'];
  uid: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  classAccess: Array<ClassSubjectsType>;
  email: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  uid: Scalars['String'];
};