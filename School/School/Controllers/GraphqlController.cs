using Microsoft.AspNetCore.Mvc;
using GraphQL;
using GraphQL.Validation;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using School.GraphQL;
using System.Collections.Generic;
using School.Services;
using System.Security.Claims;

namespace School.Controllers
{
    public class GraphQLQuery
    {
        public string OperationName { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class GraphQLController : ControllerBase
    {
        private SchoolSchema _schema;
        private UserService _us;

        public GraphQLController(SchoolSchema schema, UserService us)
        {
            _schema = schema;
            _us = us;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] GraphQLQuery query,
          [FromServices] IEnumerable<IValidationRule> validationRules)
        {
            var user = Request.Headers["X-Firebase-Uid"].Count != 0 ? 
				        _us.GetByUid(Request.Headers["X-Firebase-Uid"]) : null;

            var claims = new List<Claim>();

            if(user != null) {
                claims.Add(new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "Teacher"));
            }

            var json = await _schema.ExecuteAsync(_ =>
            {
                _.ValidationRules = validationRules;
                _.Query = query.Query;
                _.Inputs = query.Variables.ToInputs();
                _.UserContext = new GraphQLContext
                {
                  User = new ClaimsPrincipal(new ClaimsIdentity(claims)),
                  UserDb = user
                };
            });

            return new JsonResult(JsonConvert.DeserializeObject(json));
        }
    }
}