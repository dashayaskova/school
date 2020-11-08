using GraphQL.Types;
using School.Models;
using School.Services;
using System.Collections.Generic;
using MongoDB.Driver;

namespace School.GraphTypes
{
     public class UserType : ObjectGraphType<User>
    {
        public UserType(ClassService cs)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Name", x => x.Name);
            Field("Email", x => x.Email);
            Field("Uid", x => x.Uid);
            Field("IsAdmin", x => x.IsAdmin);
            Field<ListGraphType<ClassType>>(
                "ClassAccess",
                resolve: context => {
                    if (context.Source.ClassAccess != null) {
                        return cs.Get(Builders<Class>.Filter.In("_id", context.Source.ClassAccess));
                    } else {
                        return new List<Class>();
                    }
                }
            );
        }
    }
}