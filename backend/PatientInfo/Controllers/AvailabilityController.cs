using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientInfo.Data;
using PatientInfo.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PatientInfo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvailabilityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AvailabilityController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Availability
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Availability>>> GetAvailabilities()
        {
            return await _context.Availabilities.ToListAsync();
        }

        // POST: api/Availability
        [HttpPost]
        public async Task<ActionResult<Availability>> CreateAvailability(Availability availability)
        {
            if (ModelState.IsValid)
            {
                _context.Availabilities.Add(availability);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Availability created successfully" });
            }

            return BadRequest(ModelState);
        }
    }
}
