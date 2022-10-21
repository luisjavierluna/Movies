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
