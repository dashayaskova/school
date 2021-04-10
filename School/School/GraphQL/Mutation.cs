using GraphQL.Types;
using School.Services;
using School.GraphTypes;
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

            Field<NonNullGraphType<UserType>>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }
                ),
                resolve: context =>
                {   
                    return us.Add(context.GetArgument<UserInput>("data"));
                });

            Field<NonNullGraphType<UserType>>(
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

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     us.Delete(context.GetArgument<string>("id"))
                );

            Field<NonNullGraphType<ClassType>>(
                "createClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return cs.Add(context.GetArgument<ClassInput>("data"));
                });
            
            Field<NonNullGraphType<ClassType>>(
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

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     cs.Delete(context.GetArgument<string>("id"))
                );
            
            Field<NonNullGraphType<StudentType>>(
                "createStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StudentInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return ss.Add(context.GetArgument<StudentInput>("data"));
                });

            Field<NonNullGraphType<StudentType>>(
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
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteStudent",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     ss.Delete(context.GetArgument<string>("id"))
                );
            
            Field<NonNullGraphType<SubjectType>>(
                "createSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return subS.Add(context.GetArgument<SubjectInput>("data"));
                });
            
            Field<NonNullGraphType<SubjectType>>(
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
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context => 
                {
                    return subS.Delete(context.GetArgument<string>("id"));
                });

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<GradeType>>>>(
                "createGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Add(context.GetArgument<List<GradeInput>>("data"));
                });
            
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<GradeType>>>>(
                "editGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<GradeInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Edit(context.GetArgument<List<GradeInput>>("data"));
                });
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "removeGrades",
                arguments: new QueryArguments(
                    new QueryArgument<ListGraphType<StringGraphType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gs.Delete(context.GetArgument<List<string>>("data"));
                });

            Field<NonNullGraphType<GradeSpaceType>>(
                "createGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return gss.Add(context.GetArgument<GradeSpaceInput>("data"));
                });
            
            Field<NonNullGraphType<GradeSpaceType>>(
                "editGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var gradeSpace = context.GetArgument<GradeSpaceInput>("data");
                    return gss.Edit(gradeSpace.Id, gradeSpace);
                });
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    return gss.Delete(context.GetArgument<string>("id"));;
                });
            
            Field<NonNullGraphType<ClassType>>(
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
            
            Field<NonNullGraphType<BooleanGraphType>>(
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