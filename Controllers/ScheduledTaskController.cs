using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApplicationBasic.Data;
using WebApplicationBasic.Models;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class ScheduledTaskController : Controller
    {
        private readonly ScheduledTaskContext _context;
        private readonly ILogger<ScheduledTaskController> _logger;

        public ScheduledTaskController(ScheduledTaskContext context, ILogger<ScheduledTaskController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]/{filter}/{orderBy}/{sortOrder}")]
        public async Task<IEnumerable<ScheduledTask>> TaskList(string filter, string orderBy, string sortOrder)
        {
            bool activeFiltered = filter == "Active";
            Expression<Func<ScheduledTask, Object>> orderByExpression = null;
            switch (orderBy.ToLower())
            {
                case "name":
                    orderByExpression = t => t.Name;
                    break;
                default:
                    orderByExpression = t => t.Priority;
                    break;
            }

            IOrderedQueryable<ScheduledTask> query = sortOrder.ToLower() == "desc" ?
                _context.ScheduledTasks.OrderByDescending(orderByExpression)
                : _context.ScheduledTasks.OrderBy(orderByExpression);

            return await query.Where(t => !t.IsDeleted && (filter == "All" || (t.IsActive == activeFiltered))).ToListAsync();
        }

        [HttpGet("[action]/{taskId}/{filter}/{orderBy}/{sortOrder}")]
        public async Task<IEnumerable<ScheduledTask>> CompleteTask(int taskId, string filter, string orderBy, string sortOrder)
        {
            try {
                var task = _context.ScheduledTasks.Where(t => t.ID == taskId).FirstOrDefault();
                if (task != null) {
                    task.IsActive = false;
                    _context.SaveChanges();
                } else {
                    _logger.LogCritical("Complete task error: can't find task with ID: " + taskId);
                }
            } catch(Exception e) {
                _logger.LogCritical(e.Message, e.StackTrace);
            }
            return await TaskList(filter, orderBy, sortOrder);
        }

        [HttpGet("[action]/{taskId}/{filter}/{orderBy}/{sortOrder}")]
        public async Task<IEnumerable<ScheduledTask>> RemoveTask(int taskId, string filter, string orderBy, string sortOrder)
        {
            try {
                var task = _context.ScheduledTasks.Where(t => t.ID == taskId).FirstOrDefault();
                if (task != null) {
                    task.IsDeleted = true;
                    _context.SaveChanges();
                } else {
                    _logger.LogCritical("Delete task error: can't find task with ID: " + taskId);
                }
            } catch(Exception e) {
                _logger.LogCritical(e.Message, e.StackTrace);
            }
            return await TaskList(filter, orderBy, sortOrder);
        }

        [HttpPost("[action]")]
        public JsonResult AddTask([FromBody]ScheduledTask task)
        {
            try {
                _context.ScheduledTasks.Add(task);
                _context.SaveChanges();
                return new JsonResult(task);
            } catch(Exception e) {
                _logger.LogCritical(e.Message, e.StackTrace);
                return new JsonResult(e);
            }
        }
    }
}
