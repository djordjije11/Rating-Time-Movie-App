using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatingTime.DTO.Models.Ratings;
using RatingTime.DTO.Models.Users;
using RatingTime.DTO.Pagination;
using RatingTime.Logic.Users;
using System.Security.Claims;
using System.Text.Json;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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

        [HttpGet("all"), Authorize(Policy = "Admin")]
        public async Task<ActionResult<List<UserInfo>>> GetAll()
        {
            //proveriti da li je administrator

            return mapper.Map<List<UserInfo>>(await userLogic.GetAllAsync());
        }

        [HttpGet, Authorize(Policy = "Admin")]
        public async Task<ActionResult<List<UserInfo>>> GetAllAsync([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 40)
        {
            if(pageNumber < 1 || pageSize < 1)
            {
                return BadRequest("Query parameters are not valid.");
            }
            if(pageSize > 200)
            {
                return BadRequest("Page size cannot be upper than 200.");
            }
            //proveriti da li je administrator

            var paginationMetadata = new PaginationMetadata() {
                CurrentPage = pageNumber,
                PageSize = pageSize,
                TotalItemCount = await userLogic.GetCountAsync()
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return mapper.Map<List<UserInfo>>(await userLogic.GetAllAsync(pageSize, pageSize * (pageNumber - 1)));
        }

        [HttpGet("ratings"), Authorize(Policy = "User")]
        public async Task<ActionResult<List<UserRatingInfo>>> GetRatingsAsync()
        {
            try
            {
                int userId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
                var userRatings = mapper.Map<List<UserRatingInfo>>(await userLogic.GetRatingsAsync(userId));
                return Ok(userRatings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
