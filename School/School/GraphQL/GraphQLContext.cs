using System.Collections.Generic;
using System.Security.Claims;
using GraphQL.Authorization;
using School.Models;

namespace School.GraphQL
{
    public class GraphQLContext : Dictionary<string, object>, IProvideClaimsPrincipal
    {
      public ClaimsPrincipal User { get; set; }
      public User UserDb { get; set; }
    }
}