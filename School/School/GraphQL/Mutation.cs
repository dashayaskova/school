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
                    return us.Add(context.GetArgument<UserInput>("data"));
                });

            Field<UserType>(
                "editUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return us.Edit(context.GetArgument<string>("id"),
                     context.GetArgument<UserInput>("data"));
                });

            Field<BooleanGraphType>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     us.Delete(context.GetArgument<string>("id"))
                );

            Field<ClassType>(
                "createClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return cs.Add(context.GetArgument<ClassInput>("data"));
                });
            
            Field<ClassType>(
                "editClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return cs.Edit(context.GetArgument<string>("id"), 
                        context.GetArgument<ClassInput>("data"));
                });

            Field<BooleanGraphType>(
                "deleteClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     cs.Delete(context.GetArgument<string>("id"))
                );
            
            Field<StudentType>(
                "createStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StudentInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return ss.Add(context.GetArgument<StudentInput>("data"));
                });

            Field<StudentType>(
                "editStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StudentInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return ss.Edit(context.GetArgument<string>("id"),
                     context.GetArgument<StudentInput>("data"));
                });
            
            Field<BooleanGraphType>(
                "deleteStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     ss.Delete(context.GetArgument<string>("id"))
                );
            
            Field<SubjectType>(
                "createSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return subS.Add(context.GetArgument<SubjectInput>("data"));
                });
            
            Field<SubjectType>(
                "editSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return subS.Edit(context.GetArgument<string>("id"), 
                        context.GetArgument<SubjectInput>("data"));
                });
            
            Field<BooleanGraphType>(
                "deleteSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context => 
                {
                    return subS.Delete(context.GetArgument<string>("id"));
                });

            Field<ListGraphType<GradeType>>(
                "createGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Add(context.GetArgument<List<GradeInput>>("data"));
                });
            
            Field<ListGraphType<GradeType>>(
                "editGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Edit(context.GetArgument<List<GradeInput>>("data"));
                });
            
            Field<ListGraphType<StringGraphType>>(
                "removeGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<StringGraphType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Delete(context.GetArgument<List<string>>("data"));
                });

            Field<GradeSpaceType>(
                "createGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gss.Add(context.GetArgument<GradeSpaceInput>("data"));
                });
            
            Field<GradeSpaceType>(
                "editGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var gradeSpace = context.GetArgument<GradeSpaceInput>("data");
                    return gss.Edit(gradeSpace.Id, gradeSpace);
                });
            
            Field<BooleanGraphType>(
                "deleteGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return gss.Delete(context.GetArgument<string>("id"));;
                });
            
            Field<ClassType>(
                "addStudentsToClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" },
                    new QueryArgument<ListGraphType<NonNullGraphType<StringGraphType>>> { Name = "students" }
                ),
                resolve: context =>
                {
                    return cs.AddStudent(
                        context.GetArgument<string>("classId"), 
                        context.GetArgument<List<string>>("students"));
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
        }
    }
}