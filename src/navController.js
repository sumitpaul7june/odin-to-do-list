const navController = (function ()
{
    const nav = document.querySelector("nav");
    let currentView = "inbox";
    let onViewChange = null;

    function setOnViewChange(callback)
    {
        onViewChange = callback;
    }

    function getCurrentView()
    {
        return currentView;
    }

    /* NAVIGATION */

    nav.addEventListener("click", (e) =>
    {
        const button = e.target.closest(".inbox, .today, .week, .completed");
        if (!button) return;

        if (button.classList.contains("inbox")) currentView = "inbox";
        if (button.classList.contains("today")) currentView = "today";
        if (button.classList.contains("week")) currentView = "week";
        if (button.classList.contains("completed")) currentView = "completed";

        if (onViewChange)
        {
            onViewChange(currentView);
        }
    });

    return
    {
        getCurrentView,
        setOnViewChange
    };

})();

export default navController;
