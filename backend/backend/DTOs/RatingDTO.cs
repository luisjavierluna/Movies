﻿using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class RatingDTO
    {
        public int MovieId { get; set; }
        [Range(1, 5)]
        public int Score { get; set; }
    }
}
