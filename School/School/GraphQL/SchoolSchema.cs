using GraphQL;
using GraphQL.Types;

namespace School.GraphQL
{
    public class SchoolSchema : Schema
    {
        public SchoolSchema(IDependencyResolver resolver): base(resolver)
		{
			Query = resolver.Resolve<Query>();
            Mutation = resolver.Resolve<Mutation>();
		}
    }
}