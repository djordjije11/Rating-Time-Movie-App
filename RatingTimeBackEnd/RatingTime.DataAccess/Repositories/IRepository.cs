namespace RatingTime.DataAccess.Repositories
{
    public interface IRepository<T>
    {
        Task<bool> SaveChangesAsync();
        Task<bool> ExistsAsync(T entity);
    }
}
