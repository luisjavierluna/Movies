using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext applicationDbContext;

        public RatingsController(
            UserManager<IdentityUser> userManager,
            ApplicationDbContext applicationDbContext)
        {
            this.userManager = userManager;
            this.applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var currentRating = await applicationDbContext.Ratings
                .FirstOrDefaultAsync(x => x.MovieId == ratingDTO.MovieId
                && x.UserId == userId);

            if (currentRating == null)
            {
                var rating = new Rating();
                rating.MovieId = ratingDTO.MovieId;
                rating.Score = ratingDTO.Score;
                rating.UserId = userId;
                applicationDbContext.Add(rating);
            }
            else
            {
                currentRating.Score = ratingDTO.Score;
            }

            await applicationDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
