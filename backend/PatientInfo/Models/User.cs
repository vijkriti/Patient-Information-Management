namespace PatientInfo.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string ExtensionNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string MaritalStatus { get; set; }
        public string Gender { get; set; }
        public string NpiNumber { get; set; }
        public string StreetAddress { get; set; }
        public string Floor { get; set; }
        public string Department { get; set; }
        public string Room { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ProfileImagePath { get; set; }
    }
}
