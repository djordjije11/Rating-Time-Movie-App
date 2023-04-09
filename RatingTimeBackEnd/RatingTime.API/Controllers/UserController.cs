using AutoMapper;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.DTO.Pagination;
using RatingTime.Logic.Users;
using RatingTime.Validation.Users;
using System.Text.Json;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic userLogic;
        private readonly IMapper mapper;
        private readonly IDataProtectionProvider dataProtection;
        private readonly UserValidator userValidator;

        public UserController(IUserLogic userLogic, IMapper mapper, IDataProtectionProvider dataProtection, UserValidator userValidator)
        {
            this.userLogic = userLogic;
            this.mapper = mapper;
            this.dataProtection = dataProtection;
            this.userValidator = userValidator;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<UserInfo>>> GetAll()
        {
            //proveriti da li je administrator

            return mapper.Map<List<UserInfo>>(await userLogic.GetAllAsync());
        }

        [HttpGet]
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

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegister userRegister)
        {
            var user = mapper.Map<User>(userRegister);

            var validationResult = await userValidator.ValidateAsync(user);
            if (validationResult.IsValid == false)
            {
                return BadRequest(new { Errors = validationResult.Errors.Select(e => e.ErrorMessage) } );
            }

            try
            {
                await userLogic.RegisterAsync(user);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("The user is registered.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLogin userLogin)
        {
            var user = mapper.Map<User>(userLogin);

            try
            {
                await userLogic.LoginAsync(user);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("The user is logged in.");
        }
    }
}
