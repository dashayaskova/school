using GraphQL.Types;
using School.Services;
using School.GraphTypes;
using School.Models;
using System.Linq;
using MongoDB.Bson;

namespace School.GraphQL
{
    public class Mutation : ObjectGraphType
    {
        public Mutation(UserService us, ClassService cs)
        {
            Name = "Mutation";

            Field<UserType>(
                "createUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var userInput = context.GetArgument<UserInput>("data");
                    var user = new User() {
                        Name = userInput.Name,
                        IsAdmin = userInput.IsAdmin,
                        Email = userInput.Email,
                        Uid = userInput.Uid,
                        ClassAccess = userInput.ClassAccess.Select(i => ObjectId.Parse(i)).ToList()
                    };
                    us.AddUser(user);
                    return user;
                });

            Field<UserType>(
                "editUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "data" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {   
                    var userInput = context.GetArgument<UserInput>("data");
                    var id = context.GetArgument<string>("id");

                    return us.EditUser(id, userInput);
                });
            
            Field<BooleanGraphType>(
                "deleteUser",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id" }
                ),
                resolve: context =>
                     us.DeleteUser(context.GetArgument<string>("id"))
                );

            Field<ClassType>(
                "createClass",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ClassInputType>> { Name = "data" }
                ),
                resolve: context =>
                {
                    var classObj = context.GetArgument<Class>("data");
                    cs.AddClass(classObj);
                    return classObj;
                });
            }
        }
}