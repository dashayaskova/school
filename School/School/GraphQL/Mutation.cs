using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using School.Models;
using System.Linq;
using MongoDB.Bson;
using System.Collections.Generic;

namespace School.GraphQL
{
    public class Mutation : ObjectGraphType
    {
        public Mutation(
            UserService us, 
            ClassService cs, 
            StudentService ss,
            GradeSpaceService gss,
            GradeService gs,
            SubjectService subS)
        {
            Name = "Mutation";

            Field<UserType>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var userInput = context.GetArgument<UserInput>("data");
                    var user = new User()
                    {
                        Name = userInput.Name,
                        IsAdmin = userInput.IsAdmin,
                        Email = userInput.Email,
                        Uid = userInput.Uid,
                        ClassAccess = userInput.ClassAccess.Select(i => new ClassSubjects() {
                            ClassId = ObjectId.Parse(i.ClassId),
                            SubjectAccess = i.SubjectAccess.Select(j => ObjectId.Parse(j)).ToList()
                        }).ToList()
                    };
                    us.AddUser(user);
                    return user;
                });

            Field<UserType>(
                "editUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var userInput = context.GetArgument<UserInput>("data");
                    var id = context.GetArgument<string>("id");

                    return us.EditUser(id, userInput);
                });

            Field<BooleanGraphType>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     us.DeleteUser(context.GetArgument<string>("id"))
                );

            Field<ClassType>(
                "createClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var classInput = context.GetArgument<ClassInput>("data");
                    var classObj = new Class()
                    {
                        Name = classInput.Name,
                        Year = classInput.Year,
                        // CurrentTeacher = ObjectId.Parse(classInput.CurrentTeacher),
                        Students = new List<ObjectId>()
                    };
                    cs.Add(classObj);
                    return classObj;
                });
            
            Field<StudentType>(
                "editStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StudentInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var s = context.GetArgument<StudentInput>("data");
                    var id = context.GetArgument<string>("id");

                    var student = ss.EditStudent(id, s);
                    return student;
                });

            Field<StudentType>(
                "createStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StudentInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var s = context.GetArgument<StudentInput>("data");
                    var student = new Student()
                    {
                        Birthday = s.Birthday,
                        Email = s.Email,
                        Name = s.Name,
                        Patronymic = s.Patronymic,
                        Phone = s.Phone,
                        RegistryId = s.RegistryId,
                        Surname = s.Surname
                    };
                    ss.Add(student);
                    return student;
                });
            
            Field<SubjectType>(
                "createSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var subjectInput = context.GetArgument<SubjectInput>("data");
                    var subject = new Subject()
                    {
                        Name = subjectInput.Name,
                        Class = ObjectId.Parse(subjectInput.Class),
                    };
                    subS.Add(subject);
                    return subject;
                });
            
            Field<SubjectType>(
                "editSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var subject = context.GetArgument<SubjectInput>("data");
                    var id = context.GetArgument<string>("id");
                    var student = subS.EditSubject(id, subject);
                    return student;
                });
            
            Field<BooleanGraphType>(
                "deleteSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context => 
                {
                    var id = context.GetArgument<string>("id");
                    var res = subS.Delete(id);
                    var gradeSpaces = gss.GetBySubjectId(id);
                    gss.DeleteBySubject(ObjectId.Parse(id));
                    gs.DeleteByGradeSpaces(gradeSpaces.Select(e => ObjectId.Parse(e.Id)));
                    return res;
                });

            Field<ListGraphType<GradeType>>(
                "createGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var list = context.GetArgument<List<GradeInput>>("data");
                    var grades = list.Select(e => new Grade()
                    {
                        Mark = e.Mark,
                        GradeSpace = ObjectId.Parse(e.GradeSpace),
                        Student = ObjectId.Parse(e.Student),
                    }).ToList();
                    gs.AddRange(grades);
                    return grades;
                });
            
            Field<ListGraphType<GradeType>>(
                "editGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var list = context.GetArgument<List<GradeInput>>("data");
                    var grades = list.Select(e => new Grade()
                    {
                        Id = e.Id,
                        Mark = e.Mark,
                    }).ToList();;
                    return gs.EditRange(grades);
                });
            
            Field<ListGraphType<StringGraphType>>(
                "removeGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<StringGraphType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var list = context.GetArgument<List<string>>("data");
                    gs.RemoveRange(list);
                    return list;
                });

            Field<GradeSpaceType>(
                "createGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var s = context.GetArgument<GradeSpaceInput>("data");
                    var gradeSpace = new GradeSpace()
                    {
                        Name = s.Name,
                        Date = s.Date,
                        Type = s.Type,
                        Subject = ObjectId.Parse(s.Subject)
                    };
                    gss.Add(gradeSpace);
                    return gradeSpace;
                });
            
            Field<GradeSpaceType>(
                "editGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var gradeSpace = context.GetArgument<GradeSpaceInput>("data");
                    return gss.EditGradeSpace(gradeSpace.Id, gradeSpace);
                });
            
            Field<BooleanGraphType>(
                "deleteGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("id");
                    var result = gss.Delete(id);
                    gs.DeleteByGradeSpace(id);
                    return result;
                });
            
            Field<ClassType>(
                "addStudentsToClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" },
                    new QueryArgument<ListGraphType<NonNullGraphType<StringGraphType>>> { Name = "students" }
                ),
                resolve: context =>
                {
                    var newClass = cs.AddStudent(
                        context.GetArgument<string>("classId"), 
                        context.GetArgument<List<string>>("students"));

                    return newClass;
                });
            
            Field<BooleanGraphType>(
                "removeStudentFromClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "studentId" }
                ),
                resolve: context => 
                {
                    return cs.RemoveStudent(
                        context.GetArgument<string>("classId"), 
                        context.GetArgument<string>("studentId"));
                });

            Field<ClassType>(
                "editClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var classInput = context.GetArgument<ClassInput>("data");
                    var id = context.GetArgument<string>("id");

                    return cs.EditClass(id, classInput);
                });

            Field<BooleanGraphType>(
                "deleteClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     cs.Delete(context.GetArgument<string>("id"))
                );
            
            Field<BooleanGraphType>(
                "deleteStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     ss.Delete(context.GetArgument<string>("id"))
                );
        }
    }
}