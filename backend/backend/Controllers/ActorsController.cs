using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
