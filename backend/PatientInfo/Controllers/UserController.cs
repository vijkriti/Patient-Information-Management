//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using PatientInfo.Data;
//using PatientInfo.Models;
//namespace PatientInfo.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]

//        public class UserController : ControllerBase
//        {
//            private readonly ApplicationDbContext _context;

//            public UserController(ApplicationDbContext context)
//            {
//                _context = context;
//            }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
//        {
//            return await _context.Users.ToListAsync();
//        }


//        [HttpPost]
//            public IActionResult CreateUser([FromBody] User user)
//            {
//                if (ModelState.IsValid)
//                {
//                    _context.Users.Add(user);
//                    _context.SaveChanges();
//                    return Ok(new { message = "User created successfully" });
//                }

//                return BadRequest(ModelState);
//            }
//        }
//}



// UserController.cs
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientInfo.Data;
using PatientInfo.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace PatientInfo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public UserController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromForm] UserFormData formData)
        {
            try
            {
                // Deserialize the JSON data
                var userObj = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(formData.user);

                if (userObj == null)
                {
                    return BadRequest("Invalid user data");
                }

                // Handle the image file if it exists
                if (formData.image != null && formData.image.Length > 0)
                {
                    var fileName = Path.GetFileName(formData.image.FileName);
                    var filePath = Path.Combine(_environment.WebRootPath, "images", fileName);

                    // Ensure the directory exists
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                    // Save the file to disk
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formData.image.CopyToAsync(stream);
                    }

                    // Set the profile image path in the user object
                    userObj.ProfileImagePath = $"/images/{fileName}";
                }

                // Validate user object
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Save user to database
                _context.Users.Add(userObj);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User created successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error creating user: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
            }
        }

        public class UserFormData
        {
            public string user { get; set; }
            public IFormFile image { get; set; }
        }
    }
}

