using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RatingTime.Domain.Models
{
    public class Rating
    {
        private int starsNumber;

        public int Id { get; set; }
        [Range(1, 5)]
        public int StarsNumber
        {
            get => starsNumber;
            set
            {
                if (value >= 1 || value <= 5)
                {
                    starsNumber = value;
                }
            }
        }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public Movie Movie { get; set; }
    }
}
