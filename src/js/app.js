import * as flsFunctions from "./modules/functions.js";
import updateCalendar from "./modules/updateCalendar.js";
import { showCalendars, nextMonth, prevMonth, prevYear, nextYear, changeYear, toggleSelector, hideCalendars, submitDate, nullDate, submitDateFromInput, dateFormSubmit } from "./modules/calendar.js";

// Change Also in the calendar.js file
let dateFrom = new Date("1999-10-1");
let dateTo = new Date("2023-09-1")

flsFunctions.isWebp();
updateCalendar(dateFrom, dateTo, 0, 0)
dateFormSubmit();

window.dateFormSubmit = dateFormSubmit;
window.nullDate = nullDate;
window.submitDate = submitDate;
window.hideCalendars = hideCalendars;
window.showCalendars = showCalendars;
window.nextMonth = nextMonth;
window.prevMonth = prevMonth;
window.prevYear = prevYear;
window.nextYear = nextYear;
window.changeYear = changeYear;
window.toggleSelector = toggleSelector;



document.getElementById('date-input-1').addEventListener('input', function (e) {
    let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (inputValue.length > 8) {
        inputValue = inputValue.substring(0, 8); // Limit the input to 8 characters (DDMMYYYY)
    }
    if (inputValue.length > 2) {
        inputValue = inputValue.substring(0, 2) + '.' + inputValue.substring(2); // Add a dot after the first two characters
    }
    if (inputValue.length > 5) {
        inputValue = inputValue.substring(0, 5) + '.' + inputValue.substring(5); // Add a dot after the fifth character
    }
    e.target.value = inputValue;
})
document.getElementById('date-input-1').addEventListener('change', function (e) {
    const enteredDate = new Date(e.target.value.split('.').reverse().join('-'));
    const currentDate = new Date();
    if (enteredDate > currentDate) {
        document.getElementById('error-message').textContent = 'Выбирите дату не позднее сегодняшнего дня';
    }
    else if(e.target.value.length !== 10)
    {
        document.getElementById('error-message').textContent = 'Неправильная длина строки';
    }
    else if(enteredDate == "Invalid Date")
    {
        document.getElementById('error-message').textContent = 'Не правильная дата';
    }
    else {
        document.getElementById('error-message').textContent = '';
        submitDateFromInput(document.getElementById('date-input-1'), 1);
        submitDate()
    }
})

document.getElementById('date-input-2').addEventListener('input', function (e) {
    let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (inputValue.length > 8) {
        inputValue = inputValue.substring(0, 8); // Limit the input to 8 characters (DDMMYYYY)
    }
    if (inputValue.length > 2) {
        inputValue = inputValue.substring(0, 2) + '.' + inputValue.substring(2); // Add a dot after the first two characters
    }
    if (inputValue.length > 5) {
        inputValue = inputValue.substring(0, 5) + '.' + inputValue.substring(5); // Add a dot after the fifth character
    }
    e.target.value = inputValue;
})
document.getElementById('date-input-2').addEventListener('change', function (e) {
    const enteredDate = new Date(e.target.value.split('.').reverse().join('-'));
    const currentDate = new Date(); 
    if (enteredDate > currentDate) {
        document.getElementById('error-message-2').textContent = 'Выбирите дату не позднее сегодняшнего дня';
    }
    else if(e.target.value.length !== 10)
    {
        document.getElementById('error-message').textContent = 'Неправильная длина строки';
    }
    else if(enteredDate == "Invalid Date")
    {
        document.getElementById('error-message-2').textContent = 'Не правильная дата';
    }
    else {
        document.getElementById('error-message-2').textContent = '';
        submitDateFromInput(document.getElementById('date-input-2'), 2);
        submitDate()
    }
})