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

        [HttpGet]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var hoy = DateTime.Today;

            var futureReleases = await context.Movies
                .Where(x => x.ReleaseDate > hoy)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var inTheaters = await context.Movies
                .Where(x => x.InTheaters)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var result = new LandingPageDTO();
            result.FutureReleases = mapper.Map<List<MovieDTO>>(futureReleases);
            result.InTheaters = mapper.Map<List<MovieDTO>>(inTheaters);

            return result;
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

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<MoviesPutGetDTO>> PutGet(int id)
        {
            var movieActionResult = await Get(id);
            if (movieActionResult.Result is NotFoundResult) { return NotFound(); }

            var movie = movieActionResult.Value;

            var selectedGenresIds = movie.Genres.Select(x => x.Id).ToList();
            var noSelectedGenres = await context.Genres
                .Where(x => !selectedGenresIds.Contains(x.Id))
                .ToListAsync();

            var selectedTheatersIds = movie.Theaters.Select(x => x.Id).ToList();
            var noSelectedTheaters = await context.Theaters
                .Where(x => !selectedTheatersIds.Contains(x.Id))
                .ToListAsync();

            var noSelectedGenresDTO = mapper.Map<List<GenreDTO>>(noSelectedGenres);
            var noSelectedTheatersDTO = mapper.Map<List<TheaterDTO>>(noSelectedTheaters);

            var response = new MoviesPutGetDTO();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.NoSelectedGenres= noSelectedGenresDTO;
            response.SelectedTheaters = movie.Theaters;
            response.NoSelectedTheaters = noSelectedTheatersDTO;
            response.Actors = movie.Actors;
            return response;
        }

        [HttpPut("{id:int")]
        public async Task<ActionResult> Put(int id, [FromForm] CreateMovieDTO createMovieDTO)
        {
            var movie = await context.Movies
                .Include(x => x.ActorsMovies)
                .Include(x => x.GenresMovies)
                .Include(x => x.TheatersMovies)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            movie = mapper.Map(createMovieDTO, movie);

            if (createMovieDTO.Poster != null)
            {
                movie.Poster = await storerFiles.EditFile(container, createMovieDTO.Poster, movie.Poster);
            }

            SetActorsSequence(movie);

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
