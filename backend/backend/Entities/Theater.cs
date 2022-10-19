using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Theater
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 75)]
        public string Name { get; set; }
        public Point Location { get; set; }
    }
}
