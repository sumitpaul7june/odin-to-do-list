import
{
    isTaskDueToday,
    isTaskDueThisWeek,
    isTaskCompleted
}
from "./taskFilters";

/* VIEW CONFIGURATION */

const viewConfig =
{
    inbox:
    {
        title: "Inbox",
        filter: () => true
    },

    today:
    {
        title: "Today",
        filter: isTaskDueToday
    },

    week:
    {
        title: "Week",
        filter: isTaskDueThisWeek
    },

    completed:
    {
        title: "Completed",
        filter: isTaskCompleted
    }
};

export
{
    viewConfig
};
