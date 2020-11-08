using GraphQL.Types;
using School.Models;

namespace School.GraphTypes
{
     public class ClassType : ObjectGraphType<Class>
    {
        public ClassType()
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Name", x => x.Name);
        }
    }
}