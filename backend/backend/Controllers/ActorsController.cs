using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorerFiles storerFiles;
        private readonly string container = "actors";

        public ActorsController(
            ApplicationDbContext context,
            IMapper mapper,
            IStorerFiles storerFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storerFiles = storerFiles;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actors);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] CreateActorDTO createActorDTO)
        {
            var actor = mapper.Map<Actor>(createActorDTO);

            if (createActorDTO.Photo != null)
            {
                actor.Photo = await storerFiles.SaveFile(container, createActorDTO.Photo);
            }

            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("searchByName")]
        public async Task<ActionResult<List<ActorMovieDTO>>> BuscarPorNombre([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name)) { return new List<ActorMovieDTO>(); }
            return await context.Actors
                .Where(x => x.Name.Contains(name))
                .Select(x => new ActorMovieDTO { Id = x.Id, Name = x.Name, Photo = x.Photo })
                .Take(5)
                .ToListAsync();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] CreateActorDTO createActorDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            actor = mapper.Map(createActorDTO, actor);

            if (createActorDTO.Photo != null)
            {
                actor.Photo = await storerFiles.SaveFile(container, createActorDTO.Photo);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            var exists = await context.Actors.AnyAsync(x => x.Id == id);

            if (!exists)
            {
                return NotFound();
            }

            context.Remove(new Actor() { Id = id });
            await context.SaveChangesAsync();

            await storerFiles.DeleteFile(actor.Photo, container);
            return NoContent();
        }
    }
}
