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
        }
    }
}
