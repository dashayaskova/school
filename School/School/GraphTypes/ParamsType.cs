using GraphQL.Types;
using School.Models;

namespace School.GraphTypes
{
     public class ParamsType : ObjectGraphType<Params>
    {
        public ParamsType()
        {
            Field("Id", x => x.Id, type: typeof(NonNullGraphType<IdGraphType>));
            Field("Years", x => x.Years);
            Field("CurrentYear", x => x.CurrentYear);
        }
    }
}