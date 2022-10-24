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
    public class MoviesController : ControllerBase
    {
        
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorerFiles storerFiles;
        private readonly string container = "movies";

        public MoviesController(
            ApplicationDbContext context,
            IMapper mapper,
            IStorerFiles storerFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storerFiles = storerFiles;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieDTO>> Get(int id)
        {
            var movie = await context.Movies
                .Include(x => x.GenresMovies).ThenInclude(x => x.Genre)
                .Include(x => x.ActorsMovies).ThenInclude(x => x.Actor)
                .Include(x => x.TheatersMovies).ThenInclude(x => x.Theater)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null) { return NotFound(); }

            var dto = mapper.Map<MovieDTO>(movie);
            dto.Actors = dto.Actors.OrderBy(x => x.Sequence).ToList();
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] CreateMovieDTO createMovieDTO)
        {
            var movie = mapper.Map<Movie>(createMovieDTO);

            if (createMovieDTO.Poster != null)
            {
                movie.Poster = await storerFiles.SaveFile(container, createMovieDTO.Poster);
            }

            SetActorsSequence(movie);

            context.Add(movie);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviesPostGetDTO>> PostGet()
        {
            var theaters = await context.Theaters.ToListAsync();
            var genres = await context.Genres.ToListAsync();

            var theatersDTO = mapper.Map<List<TheaterDTO>>(theaters);
            var genresDTO = mapper.Map<List<GenreDTO>>(genres);

            return new MoviesPostGetDTO() { Theaters = theatersDTO, Genres = genresDTO };
        }

        private void SetActorsSequence(Movie movie)
        {
            if (movie.ActorsMovies != null)
            {
                for (int i = 0; i < movie.ActorsMovies.Count; i++)
                {
                    movie.ActorsMovies[i].Sequence = i;
                }
            }
        }
    }
}
