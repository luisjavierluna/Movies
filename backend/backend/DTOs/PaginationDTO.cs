using AutoMapper.Execution;

namespace backend.DTOs
{
    public class PaginationDTO
    {
        public int Page { get; set; } = 1;
        public int recordsPerPage = 10;
        private readonly int maxNumberOfRecordsPerPage = 50;

        public int RecordsPerPage
        {
            get
            {
                return recordsPerPage;
            }
            set
            {
                recordsPerPage = (value > maxNumberOfRecordsPerPage) ? maxNumberOfRecordsPerPage : value;
            }
        }
    }
}
