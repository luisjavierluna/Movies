namespace backend.Utilities
{
    public class StorerFilesLocal : IStorerFiles
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public StorerFilesLocal(
            IWebHostEnvironment env, 
            IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }

        public Task DeleteFile(string route, string container)
        {
            if (string.IsNullOrEmpty(route))
            {
                return Task.CompletedTask;
            }

            var fileName = Path.GetFileName(route);
            var fileDirectory = Path.Combine(env.WebRootPath, container, fileName);

            if (File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }

            return Task.CompletedTask;
        }

        public async Task<string> EditFile(string container, IFormFile file, string route)
        {
            await DeleteFile(route, container);
            return await SaveFile(container, file);
        }

        public async Task<string> SaveFile(string container, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(env.WebRootPath, container);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string route = Path.Combine(folder, fileName);
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var content = memoryStream.ToArray();
                await File.WriteAllBytesAsync(route, content);
            }

            var currentUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var routeForDb = Path.Combine(currentUrl, container, fileName).Replace("\\", "/");
            return routeForDb;
        }
    }
}
