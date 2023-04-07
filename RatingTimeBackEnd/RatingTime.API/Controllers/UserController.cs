using AutoMapper;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Validation.Users;

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

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserRegister userRegister)
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
        public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
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
