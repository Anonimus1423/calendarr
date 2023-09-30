import * as flsFunctions from "./modules/functions.js";
import updateCalendar from "./modules/updateCalendar.js";
import { showCalendars, nextMonth, prevMonth, prevYear, nextYear, changeYear, toggleSelector, hideCalendars, submitDate } from "./modules/calendar.js";

// Change Also in the calendar.js file
let dateFrom = new Date("1999-10-1");
let dateTo = new Date("2023-09-1")

flsFunctions.isWebp();
updateCalendar(dateFrom, dateTo)

window.submitDate = submitDate;
window.hideCalendars = hideCalendars;
window.showCalendars = showCalendars;
window.nextMonth = nextMonth;
window.prevMonth = prevMonth;
window.prevYear = prevYear;
window.nextYear = nextYear;
window.changeYear = changeYear;
window.toggleSelector = toggleSelector;
