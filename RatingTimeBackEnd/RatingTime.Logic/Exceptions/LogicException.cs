namespace RatingTime.Logic.Exceptions
{
    /// <summary>
    /// Exception that Logic layer throws.
    /// Inherits Exception class.
    /// </summary>
    public class LogicException : Exception
    {
        public LogicException()
        {

        }
        public LogicException(string message) : base(message) 
        {

        }
    }
}
