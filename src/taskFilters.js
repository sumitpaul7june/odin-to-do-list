import
{
    differenceInCalendarDays,
    isSameDay,
    parseISO
}
from "date-fns";

/* TASK FILTERS */

function isTaskDueToday(task)
{
    if (!task.dueDate || task.completed) return false;

    const taskDate = parseISO(task.dueDate);
    const today = new Date();

    return isSameDay(taskDate, today);
}

function isTaskDueThisWeek(task)
{
    if (!task.dueDate || task.completed) return false;

    const taskDate = parseISO(task.dueDate);
    const today = new Date();
    const daysDifference = differenceInCalendarDays(taskDate, today);

    return daysDifference >= 0 && daysDifference <= 7;
}

function isTaskCompleted(task)
{
    return task.completed === true;
}

export
{
    isTaskDueToday,
    isTaskDueThisWeek,
    isTaskCompleted
};
