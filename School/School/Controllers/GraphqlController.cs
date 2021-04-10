using Microsoft.AspNetCore.Mvc;
using GraphQL;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using School.GraphQL;
using System.Collections.Generic;
using School.Services;

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
        public async Task<IActionResult> PostAsync([FromBody] GraphQLQuery query)
        {
            var user = Request.Headers["X-User-Uid"].Count != 0 ? 
				      _us.GetByUid(Request.Headers["X-User-Uid"]) : null;
            
            var json = await _schema.ExecuteAsync(_ =>
            {
                _.Query = query.Query;
                _.Inputs = query.Variables.ToInputs();
                _.UserContext = new Dictionary<string, object> {
                    { "user", user }
                };
            });

            return new JsonResult(JsonConvert.DeserializeObject(json));
        }
    }
}