using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using RatingTime.DataAccess.Repositories.UserRepository;
using RatingTime.Domain.Models;
using RatingTime.DTO.User;
using RatingTime.Validation;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        //private readonly IMapper _mapper;
        private readonly IDataProtectionProvider _dataProtection;

        public UserController(IUserRepository repository, /*IMapper mapper,*/ IDataProtectionProvider dataProtection)
        {
            _repository = repository;
            //_mapper = mapper;
            _dataProtection = dataProtection;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserRegister userRegister)
        {
            if(await _repository.ExistsAsync(new User() { Username = userRegister.Username, Email = userRegister.Email }) == true)
            {
                return BadRequest(new { Error = "The username or email is already being used by an active user." });
            }
            var user = new User()
            {
                Username = userRegister.Username,
                Password = userRegister.Password,
                Email = userRegister.Email,
            };
            var validationResult = await (new UserValidator().ValidateAsync(user));
            if(validationResult.IsValid == false)
            {
                return BadRequest(new { Errors = validationResult.Errors.Select(e => e.ErrorMessage) });
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _repository.SaveAsync(user);
            await _repository.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLogin userRegister)
        {
            var user = new User()
            {
                Username = userRegister.Username,
                Password = userRegister.Password,
                Email = userRegister.Email,
            };
            var loggedInUser = await _repository.GetUserAsync(user);
            if(loggedInUser == null)
            {
                return BadRequest(new { Error = "Wrong username or e-mail." });
            }
            if(BCrypt.Net.BCrypt.Verify(userRegister.Password, loggedInUser.Password) == false) 
            {
                return BadRequest(new { Error = "Wrong password." });
            }

            return Ok();
        }
    }
}
