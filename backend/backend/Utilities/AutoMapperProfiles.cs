using AutoMapper;
using backend.DTOs;
using backend.Entities;

namespace backend.Utilities
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<CreateGenreDTO, Genre>();
        }
    }
}
