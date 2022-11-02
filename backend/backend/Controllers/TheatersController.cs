using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
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

        [HttpGet]
        public async Task<ActionResult<List<TheaterDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Theaters.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var theaters = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<TheaterDTO>>(theaters);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<TheaterDTO>> Get(int Id)
        {
            var theater = await context.Theaters.FirstOrDefaultAsync(x => x.Id == Id);

            if (theater == null)
            {
                return NotFound();
            }

            return mapper.Map<TheaterDTO>(theater);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CreateTheaterDTO treateTheaterDTO)
        {
            var theater = mapper.Map<Theater>(treateTheaterDTO);
            context.Add(theater);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] CreateTheaterDTO createTheaterDTO)
        {
            var theater = await context.Theaters.FirstOrDefaultAsync(x => x.Id == Id);

            if (theater == null)
            {
                return NotFound();
            }

            theater = mapper.Map(createTheaterDTO, theater);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exists = await context.Theaters.AnyAsync(x => x.Id == id);

            if (!exists)
            {
                return NotFound();
            }

            context.Remove(new Theater() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
