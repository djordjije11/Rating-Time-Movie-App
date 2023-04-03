using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RatingTime.DataAccess.Repositories.UserRepository;
using RatingTime.Domain.Models;
using RatingTime.DTO.User;

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

        [HttpPost]
        public async Task<ActionResult> Register([FromBody] UserRegister user)
        {
            if(await _repository.ExistsAsync(new User() { Username = user.Username }) == true)
            {
                return BadRequest(new { Error = "The username is already being used by an active user." });
            }


        }
    }
}
