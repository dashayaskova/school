using GraphQL.Types;
using School.Models;
using School.Services;
using MongoDB.Driver;
using System.Collections.Generic;

namespace School.GraphTypes
{
     public class ParamsType : ObjectGraphType<Params>
    {
        public ParamsType()
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Years", x => x.Years);
            Field("CurrentYear", x => x.CurrentYear);
        }
    }
}