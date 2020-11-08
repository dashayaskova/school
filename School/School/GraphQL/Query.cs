using GraphQL.Types;
using School.Services;
using School.GraphTypes;

namespace School.GraphQL
{
    public class Query : ObjectGraphType
    {
        public Query(UserService us, ClassService cs)
        {
            Name = "Query";

            Field<ListGraphType<UserType>>(
			"users",
			resolve: context =>
			{
				var get = us.Get();
				return get;
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

            Field<ListGraphType<ClassType>>(
			"classes",
			resolve: context =>
			{
				return cs.Get();
			});
        }
    }
}