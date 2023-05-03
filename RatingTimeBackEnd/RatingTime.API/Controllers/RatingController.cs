using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Ratings;
using RatingTime.Logic.Ratings;
using RatingTime.Validation.Ratings;
using System.Security.Claims;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "User")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingLogic ratingLogic;
        private readonly IMapper mapper;
        private readonly RatingValidator ratingValidator;

        public RatingController(IRatingLogic ratingLogic, IMapper mapper, RatingValidator ratingValidator)
        {
            this.ratingLogic = ratingLogic;
            this.mapper = mapper;
            this.ratingValidator = ratingValidator;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<RatingInfo>>> GetAllAsync(CancellationToken cancellationToken)
        {
            int userId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var userRatings = mapper.Map<List<RatingInfo>>(await ratingLogic.GetAllByUserAsync(userId, cancellationToken));
            return Ok(userRatings);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveAsync([FromBody] RatingPost ratingPost)
        {
            var rating = mapper.Map<Rating>(ratingPost);
            rating.UserId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var validationResult = await ratingValidator.ValidateAsync(rating);
            if (validationResult.IsValid == false)
            {
                return BadRequest(new { Errors = validationResult.Errors.Select(e => e.ErrorMessage) });
            }

            await ratingLogic.SaveAsync(rating);
            return Ok(new { message = "Rating is saved." });
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromBody] RatingDelete ratingDelete)
        {
            var rating = mapper.Map<Rating>(ratingDelete);
            rating.UserId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
            await ratingLogic.DeleteAsync(rating);
            return Ok(new { message = "Rating is deleted." });
        }

    }
}
