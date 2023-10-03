import { generateYearSelector, selectDay } from "./calendar.js";

export const russianMonths = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];

let firstDayDivContainer = document.getElementById("calendar-days")
let secondDayDivContainer = document.getElementById("calendar-days-2")

export default function updateCalendar(dateFrom, dateTo, submited = true, submited2 = true)
{
    let i = 0;
    let day = 1;
    let day1 = 1;
    const firstDayWeek = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 0)
    const firstDayWeek1 = new Date(dateTo.getFullYear(), dateTo.getMonth(), 0)

    document.getElementById("year-2").innerHTML = dateTo.getFullYear();
    document.getElementById("month-2").innerHTML = russianMonths[dateTo.getMonth()];
    document.getElementById("year").innerHTML = dateFrom.getFullYear();
    document.getElementById("month").innerHTML = russianMonths[dateFrom.getMonth()];
    while (secondDayDivContainer.firstChild) {
        secondDayDivContainer.removeChild(secondDayDivContainer.firstChild);
    };
    while (firstDayDivContainer.firstChild) {
        firstDayDivContainer.removeChild(firstDayDivContainer.firstChild);
    }
    while(i <= 41)
    {
        i++;
        const firstDayDiv = document.createElement("div")
        const secondDayDiv = document.createElement("div")
        firstDayDiv.classList.add("calendar__item")
        secondDayDiv.classList.add("calendar__item")
        firstDayDiv.classList.add("calendar__item-1")
        secondDayDiv.classList.add("calendar__item-2")
        if(i < daysInMonth(dateTo.getFullYear(), dateTo.getMonth() + 1) + firstDayWeek1.getDay() + 1 && i > firstDayWeek1.getDay())
        {
            secondDayDiv.classList.add("active");
            const dayContent = document.createElement("p")
            dayContent.innerHTML = day;
            if(day === dateTo.getDate() && submited)
            {
                secondDayDiv.classList.add("selected");
            }
            secondDayDiv.appendChild(dayContent);
            day++;
            secondDayDiv.addEventListener("click", function() {
                selectDay(secondDayDiv, 2);
            })
        }
        if(i < daysInMonth(dateFrom.getFullYear(), dateFrom.getMonth() + 1) + firstDayWeek.getDay() + 1 && i > firstDayWeek.getDay())
        {
            firstDayDiv.classList.add("active");
            const dayContent = document.createElement("p");
            dayContent.innerHTML = day1;
            if(day1 === dateFrom.getDate() && submited2)
            {
                firstDayDiv.classList.add("selected");
            }
            firstDayDiv.appendChild(dayContent);
            day1++;
            firstDayDiv.addEventListener("click", function() {
                selectDay(firstDayDiv, 1);
            })
        }
        if(!((daysInMonth(dateTo.getFullYear(), dateTo.getMonth() + 1) + firstDayWeek1.getDay() + 1) < 37 && i > 35))
        {
            secondDayDivContainer?.appendChild(secondDayDiv);
        }
        if(!((daysInMonth(dateFrom.getFullYear(), dateFrom.getMonth() + 1) + firstDayWeek.getDay() + 1) < 37 && i > 35))
        {
            firstDayDivContainer?.appendChild(firstDayDiv);
        }
    }
    generateYearSelector("year", "year-selector", 1);
    generateYearSelector("year-2", "year-2-selector", 2);
}

function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}