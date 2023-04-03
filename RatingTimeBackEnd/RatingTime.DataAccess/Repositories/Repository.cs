namespace RatingTime.DataAccess.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected readonly RatingTimeContext _context;

        public Repository(RatingTimeContext context)
        {
            _context = context;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public abstract Task<bool> ExistsAsync(T entity);
    }
}
