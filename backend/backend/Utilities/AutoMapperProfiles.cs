using AutoMapper;
using backend.DTOs;
using backend.Entities;
using NetTopologySuite.Geometries;

namespace backend.Utilities
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<CreateGenreDTO, Genre>();
            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<CreateActorDTO, Actor>()
                .ForMember(x => x.Photo, options => options.Ignore());

            CreateMap<CreateTheaterDTO, Theater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<Theater, TheaterDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(field => field.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(field => field.Location.X));

            CreateMap<CreateMovieDTO, Movie>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.GenresMovies, options => options.MapFrom(MapGenresMovies))
                .ForMember(x => x.TheatersMovies, options => options.MapFrom(MapTheaterMovies))
                .ForMember(x => x.ActorsMovies, options => options.MapFrom(MapActorsMovies));

            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genres, options => options.MapFrom(MapGenresMovies))
                .ForMember(x => x.Actors, options => options.MapFrom(MapActorMovies))
                .ForMember(x => x.Theaters, options => options.MapFrom(MapTheaterMovies));
        }

        private List<TheaterDTO> MapTheaterMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<TheaterDTO>();

            if (movie.TheatersMovies != null)
            {
                foreach (var theaterMovies in movie.TheatersMovies)
                {
                    result.Add(new TheaterDTO()
                    {
                        Id = theaterMovies.TheaterId,
                        Name = theaterMovies.Theater.Name,
                        Latitude = theaterMovies.Theater.Location.Y,
                        Longitude = theaterMovies.Theater.Location.X
                    });
                }
            }
            return result;
        }

        private List<ActorMovieDTO> MapActorMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorMovieDTO>();

            if (movie.ActorsMovies != null)
            {
                foreach (var actorMovies in movie.ActorsMovies)
                {
                    result.Add(new ActorMovieDTO()
                    {
                        Id = actorMovies.ActorId,
                        Name = actorMovies.Actor.Name,
                        Photo = actorMovies.Actor.Photo,
                        Sequence = actorMovies.Sequence,
                        Character = actorMovies.Character
                    });
                }
            }
            return result;
        }

        private List<GenreDTO> MapGenresMovies(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<GenreDTO>();

            if (movie.GenresMovies != null)
            {
                foreach (var genre in movie.GenresMovies)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }
            return result;
        }

        private List<ActorsMovies> MapActorsMovies(
           CreateMovieDTO createMovieDTO,
           Movie movie)
        {
            var result = new List<ActorsMovies>();

            if (createMovieDTO.Actors == null) { return result; }

            foreach (var actor in createMovieDTO.Actors)
            {
                result.Add(new ActorsMovies() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }

        private List<GenresMovies> MapGenresMovies(
            CreateMovieDTO createMovieDTO,
            Movie movie)
        {
            var result = new List<GenresMovies>();

            if (createMovieDTO.GenresIds == null) { return result; }

            foreach (var id in createMovieDTO.GenresIds)
            {
                result.Add(new GenresMovies() { GenreId = id });
            }

            return result;
        }

        private List<TheatersMovies> MapTheaterMovies(
            CreateMovieDTO createMovieDTO,
            Movie movie)
        {
            var result = new List<TheatersMovies>();

            if (createMovieDTO.TheatersIds == null) { return result; }

            foreach (var id in createMovieDTO.TheatersIds)
            {
                result.Add(new TheatersMovies() { TheaterId = id });
            }

            return result;
        }

    }
}
