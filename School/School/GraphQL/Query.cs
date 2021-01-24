using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using System.Linq;

namespace School.GraphQL
{
    public class Query : ObjectGraphType
    {
        public Query(
            UserService us,
            ClassService cs,
            StudentService ss,
            SubjectService subS,
			GradeService gs,
            GradeSpaceService gss,
            ParamsService ps)
        {
            Name = "Query";

            Field<ListGraphType<UserType>>(
            "users",
            resolve: context =>
            {
                return us.Get();
            });

            Field<ListGraphType<UserType>>(
            "teachers",
            resolve: context =>
            {
                return us.GetTeachers();
            });

            Field<UserType>(
            "user",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                return us.GetById(context.GetArgument<string>("id"));
            });

            Field<UserType>(
            "userByUid",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
            ),
            resolve: context =>
            {
                return us.GetByUid(context.GetArgument<string>("uid"));
            });
            
            Field<ListGraphType<ClassType>>(
            "classes",
            resolve: context =>
            {
                return cs.Get();
            });

            Field<ClassType>(
            "class",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                return cs.GetById(context.GetArgument<string>("id"));
            });

            Field<ListGraphType<StudentType>>(
            "students",
            arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "surname" }
            ),
            resolve: context =>
            {
                var surname = context.GetArgument<string>("surname");
                return surname != null ?
                    ss.GetBySurname(surname) :
                    ss.Get();
            });

            Field<StudentType>(
            "student",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                return ss.GetById(context.GetArgument<string>("id"));
            });

			Field<SubjectType>(
            "subject",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                return subS.GetById(context.GetArgument<string>("id"));
            });

			Field<ListGraphType<SubjectType>>(
            "subjects",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" }
            ),
            resolve: context =>
            {
                return subS.GetByClassId(context.GetArgument<string>("classId"));
            });

			Field<ListGraphType<GradeType>>(
            "grades",
            arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "id" }
            ),
            resolve: context =>
            {
                return gs.GetBySubject(context.GetArgument<string>("id"));
            });

            Field<ListGraphType<GradeType>>(
            "studentGrades",
            arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "studentId" },
                new QueryArgument<StringGraphType> { Name = "classId" }
            ),
            resolve: context =>
            {
                return subS.GetGradeReport(context.GetArgument<string>("classId"), 
                    context.GetArgument<string>("studentId"));
            });

            Field<ParamsType>(
            "params",
            resolve: context =>
            {
                return ps.Get().FirstOrDefault();
            });
        }
    }
}