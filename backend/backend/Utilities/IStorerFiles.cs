﻿namespace backend.Utilities
{
    public interface IStorerFiles
    {
        Task DeleteFile(string route, string container);
        Task<string> EditFile(string container, IFormFile file, string route);
        Task<string> SaveFile(string container, IFormFile file);
    }
}