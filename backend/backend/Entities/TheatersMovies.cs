﻿namespace backend.Entities
{
    public class TheatersMovies
    {
        public int MovieId { get; set; }
        public int TheaterId { get; set; }
        public Movie Movie { get; set; }
        public Theater Theater { get; set; }
    }
}
