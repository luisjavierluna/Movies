using Microsoft.EntityFrameworkCore;

namespace backend.Utilities
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParametersPaginationInHeader<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double quantity = await queryable.CountAsync();
            httpContext.Response.Headers.Add("totalRecordsQuantity", quantity.ToString());
        }
    }
}
