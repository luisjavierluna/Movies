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
