using AutoMapper;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheatersController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public TheatersController(
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CreateTheaterDTO treateTheaterDTO)
        {
            var theater = mapper.Map<Theater>(treateTheaterDTO);
            context.Add(theater);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
