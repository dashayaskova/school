using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using System.Collections.Generic;
using MongoDB.Bson;
using System.Linq;

namespace School.GraphQL
{
    public class Query : ObjectGraphType
    {
        public Query(
            UserService us,
            ClassService cs,
            ParamsService ps,
            StudentService ss,
            SubjectService subS,
			GradeService gs,
            GradeSpaceService gss)
        {
            Name = "Query";

            Field<ListGraphType<UserType>>(
            "users",
            arguments: new QueryArguments(
                new QueryArgument<BooleanGraphType> { Name = "isAdmin" }
            ),
            resolve: context =>
            {
                var isAdmin = context.GetArgument<bool?>("isAdmin");
                var get = isAdmin != null ? us.Get((bool)isAdmin) : us.Get();
                return get;
            });

			Field<ListGraphType<GradeType>>(
            "grades",
            arguments: new QueryArguments(
                //new QueryArgument<ListGraphType<StringGraphType>> { Name = "gradeSpaces" }
                new QueryArgument<StringGraphType> { Name = "id" }
            ),
            resolve: context =>
            {
                //var gradeSpaces = context.GetArgument<List<string>>("gradeSpaces");
                var id = context.GetArgument<string>("id");
                var gradeSpaces = gss.GetBySubjectId(id).Select(e => e.Id);
                return gs.GetByGradeSpaces(gradeSpaces);
            });

			Field<SubjectType>(
            "subject",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                var subjectId = context.GetArgument<string>("id");
                return subS.GetById(subjectId);
            });

			Field<ListGraphType<SubjectType>>(
            "subjects",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" }
            ),
            resolve: context =>
            {
                var classId = context.GetArgument<string>("classId");
                return subS.GetByClassId(classId);
            });

            Field<UserType>(
            "user",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                var userId = context.GetArgument<string>("id");
                return us.GetById(userId);
            });

            Field<UserType>(
            "userByUid",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
            ),
            resolve: context =>
            {
                var uid = context.GetArgument<string>("uid");
                return us.Get(uid);
            });

            Field<ListGraphType<ClassType>>(
            "classes",
            resolve: context =>
            {
                return cs.GetList();
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
                    ss.GetStudentsBySurname(surname) :
                    ss.GetList();
            });

            Field<ClassType>(
            "class",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                var classId = context.GetArgument<string>("id");
                return cs.GetById(classId);
            });

            Field<ParamsType>(
            "params",
            resolve: context =>
            {
                return ps.Get();
            });
        }
    }
}