using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatingTime.API.Authorization;
using RatingTime.DTO.Models.Users;
using RatingTime.DTO.Pagination;
using RatingTime.Logic.Users;
using System.Text.Json;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = ICookieAuthorization.AUTHORIZATION_POLICY_USER)]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic userLogic;
        private readonly IMapper mapper;

        public UserController(IUserLogic userLogic, IMapper mapper)
        {
            this.userLogic = userLogic;
            this.mapper = mapper;
        }

        [HttpGet("all"), Authorize(Policy = ICookieAuthorization.AUTHORIZATION_POLICY_ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<UserInfo>>> GetAllAsync(CancellationToken cancellationToken)
        {
            return Ok(mapper.Map<List<UserInfo>>(await userLogic.GetAllAsync(cancellationToken)));
        }

        [HttpGet, Authorize(Policy = ICookieAuthorization.AUTHORIZATION_POLICY_ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<UserInfo>>> GetAllAsync(CancellationToken cancellationToken, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 40)
        {
            if(pageNumber < 1 || pageSize < 1)
            {
                return BadRequest(new { message = "Query parameters are not valid." });
            }
            if(pageSize > 200)
            {
                return BadRequest(new { message = "Page size cannot be upper than 200." });
            }

            var paginationMetadata = new PaginationMetadata() {
                CurrentPage = pageNumber,
                PageSize = pageSize,
                TotalItemCount = await userLogic.GetCountAsync(cancellationToken)
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return mapper.Map<List<UserInfo>>(await userLogic.GetAllAsync(pageSize, pageSize * (pageNumber - 1), cancellationToken));
        }
    }
}
