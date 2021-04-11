using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using System.Linq;
using GraphQL.Authorization;
using GraphQL;

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
            this.AuthorizeWith("AdminOrTeacherPolicy");

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<UserType>>>>(
            "users",
            resolve: context =>
            {
                return us.Get();
            }).AuthorizeWith("AdminPolicy");

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<UserType>>>>(
            "teachers",
            resolve: context =>
            {
                return us.GetTeachers();
            }).AuthorizeWith("AdminPolicy");

            Field<UserType>(
            "user",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                return us.GetById(context.GetArgument<string>("id"));
            }).AuthorizeWith("AdminPolicy");

            Field<UserType>(
            "userByUid",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
            ),
            resolve: context =>
            {
                return us.GetByUid(context.GetArgument<string>("uid"));
            });
            
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<StudentType>>>>(
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

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<ClassType>>>>(
            "classes",
            resolve: context =>
            {
                var user = (context.UserContext as GraphQLContext).UserDb;
                var classes = user.IsAdmin ? cs.Get() : cs.GetByIds(user.ClassAccess.Select(e => e.ClassId));
                return classes;
            });

            Field<ClassType>(
            "class",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
            ),
            resolve: context =>
            {
                var id = context.GetArgument<string>("id");
                var user = (context.UserContext as GraphQLContext).UserDb;

                if(!user.IsAdmin && 
                    user.ClassAccess.Find(e => e.ClassId.ToString() == id) == null) {
                        throw new ExecutionError("No access to this class");
                    }
                    
                return cs.GetById(id);
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

			      Field<NonNullGraphType<ListGraphType<NonNullGraphType<SubjectType>>>>(
            "subjects",
            arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "classId" }
            ),
            resolve: context =>
            {
                var user = (context.UserContext as GraphQLContext).UserDb;
                var id = context.GetArgument<string>("id");
                var classObj = user.ClassAccess.Find(e => e.ClassId.ToString() == id);

                if(!user.IsAdmin && 
                   classObj == null) {
                        throw new ExecutionError("No access to this class");
                }
                
                var subjects = subS.GetByClassId(context.GetArgument<string>("classId"));
                var filteredSub = user.IsAdmin || classObj.SubjectAccess.Count == 0 ? subjects : 
                   subjects.Where(s1 => classObj.SubjectAccess.Find(s2 => s1.Id == s2.ToString()) != null);
                return filteredSub;
            });

			      Field<NonNullGraphType<ListGraphType<NonNullGraphType<GradeType>>>>(
            "grades",
            arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "id" }
            ),
            resolve: context =>
            {
                return gs.GetBySubject(context.GetArgument<string>("id"));
            });

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<GradeType>>>>(
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