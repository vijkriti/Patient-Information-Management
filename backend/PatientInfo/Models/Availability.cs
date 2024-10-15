namespace PatientInfo.Models
{
    public class Availability
    {
        public int Id { get; set; }
        public string AvailabilityType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string RecurrencePattern { get; set; }
        public DateTime Date { get; set; }
    }
}
