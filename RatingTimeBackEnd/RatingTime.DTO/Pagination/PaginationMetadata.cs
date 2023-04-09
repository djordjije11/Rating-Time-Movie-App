namespace RatingTime.DTO.Pagination
{
    public record PaginationMetadata
    {
        public int PageSize { get; init; }
        public int CurrentPage { get; init; }
        public int TotalItemCount { get; init; }
        public int TotalPageCount => (int) Math.Ceiling(TotalItemCount / (double)PageSize);
    }
}
