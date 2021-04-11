using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using System.Collections.Generic;
using GraphQL.Authorization;
using GraphQL;

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
            this.AuthorizeWith("AdminOrTeacherPolicy");

            Field<NonNullGraphType<UserType>>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }
                ),
                resolve: context =>
                {   
                    return us.Add(context.GetArgument<UserInput>("data"));
                }).AuthorizeWith("AdminPolicy");

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
                }).AuthorizeWith("AdminPolicy");

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     us.Delete(context.GetArgument<string>("id"))
                ).AuthorizeWith("AdminPolicy");

            Field<NonNullGraphType<ClassType>>(
                "createClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    return cs.Add(context.GetArgument<ClassInput>("data"));
                }).AuthorizeWith("AdminPolicy");
            
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
                }).AuthorizeWith("AdminPolicy");;

            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     cs.Delete(context.GetArgument<string>("id"))
                ).AuthorizeWith("AdminPolicy");
            
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
                ).AuthorizeWith("AdminPolicy");
            
            Field<NonNullGraphType<SubjectType>>(
                "createSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var data = context.GetArgument<SubjectInput>("data");
                    var user = (context.UserContext as GraphQLContext).UserDb;
                    
                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId.ToString() == data.Class) == null) {
                        throw new ExecutionError("No access to this class");
                    }
                    
                    return subS.Add(data);
                });
            
            Field<NonNullGraphType<SubjectType>>(
                "editSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<SubjectInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var subjectId = context.GetArgument<string>("id");
                    var subject = subS.GetById(subjectId);
                    var user = (context.UserContext as GraphQLContext).UserDb;

                    if(!user.IsAdmin) {
                        var classAccess = user.ClassAccess.Find(e => e.ClassId == subject.Class);
                      
                        if(classAccess == null || 
                          (classAccess.SubjectAccess.Count != 0 &&
                          classAccess.SubjectAccess.Find(e => e.ToString() == subjectId) == null)
                        )
                          throw new ExecutionError("No access to this class");
                    }
                    
                    return subS.Edit(subjectId, context.GetArgument<SubjectInput>("data"));
                });
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteSubject",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context => 
                {
                    var subjectId = context.GetArgument<string>("id");
                    var subject = subS.GetById(subjectId);
                    var user = (context.UserContext as GraphQLContext).UserDb;

                    if(!user.IsAdmin) {
                        var classAccess = user.ClassAccess.Find(e => e.ClassId == subject.Class);
                      
                        if(classAccess == null || 
                          (classAccess.SubjectAccess.Count != 0 &&
                          classAccess.SubjectAccess.Find(e => e.ToString() == subjectId) == null)
                        )
                          throw new ExecutionError("No access to this class");
                    }
                    
                    return subS.Delete(subjectId);
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
                    var data = context.GetArgument<GradeSpaceInput>("data");
                    var user = (context.UserContext as GraphQLContext).UserDb;

                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId.ToString() == data.Class) == null) {
                        throw new ExecutionError("No access to this class");
                    }

                    return gss.Add(data);
                });
            
            Field<NonNullGraphType<GradeSpaceType>>(
                "editGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<GradeSpaceInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var data = context.GetArgument<GradeSpaceInput>("data");
                    var user = (context.UserContext as GraphQLContext).UserDb;
                    var gradeSpace = gss.GetById(data.Id);

                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId == gradeSpace.Class) == null) {
                        throw new ExecutionError("No access to this class");
                    }
                    
                    return gss.Edit(data.Id, data);
                });
            
            Field<NonNullGraphType<BooleanGraphType>>(
                "deleteGradeSpace",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("id");
                    var gradeSpace = gss.GetById(id);
                    var user = (context.UserContext as GraphQLContext).UserDb;

                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId == gradeSpace.Class) == null) {
                        throw new ExecutionError("No access to this class");
                    }

                    return gss.Delete(id);;
                });
            
            Field<NonNullGraphType<ClassType>>(
                "addStudentsToClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" },
                    new QueryArgument<ListGraphType<NonNullGraphType<StringGraphType>>> { Name = "students" }
                ),
                resolve: context =>
                {
                    var classId = context.GetArgument<string>("classId");
                    var user = (context.UserContext as GraphQLContext).UserDb; 

                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId.ToString() == classId) == null) {
                        throw new ExecutionError("No access to this class");
                    }

                    return cs.AddStudent(
                        classId, 
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
                    var classId = context.GetArgument<string>("classId");
                    var user = (context.UserContext as GraphQLContext).UserDb; 

                    if(!user.IsAdmin && 
                      user.ClassAccess.Find(e => e.ClassId.ToString() == classId) == null) {
                        throw new ExecutionError("No access to this class");
                    }

                    return cs.RemoveStudent(
                        classId, 
                        context.GetArgument<string>("studentId"));
                });
        }
    }
}