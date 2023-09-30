import updateCalendar, { russianMonths } from "./updateCalendar.js";

let prevSelector = null;

let dateFrom = 
{
    year: 1999,
    month: "Октябрь",
    day: 1
}
let dateTo = 
{
    year: 2023,
    month: "Сентябрь",
    day: 1
}
// setInterval(() => { console.log(dateFrom, dateTo) }, 1000)
function fromObjToDate(obj)
{
    return new Date(obj.year + "-" + (russianMonths.findIndex(month => month === obj.month) + 1) + "-" + obj.day)
}
export function showCalendars()
{
    document.getElementById("calendars").classList.add("active");
    document.getElementById("date-input-1").value = "ДД.ММ.ГГГГ";
    document.getElementById("date-input-2").value = "ДД.ММ.ГГГГ";
    submitDate()
}
export function hideCalendars()
{
    document.getElementById("calendars").classList.remove("active");
    if(document.getElementById("date-input-1").value === "ДД.ММ.ГГГГ")
    {
        document.getElementById("date-input-1").value = "";
        document.getElementById("date-input-2").value = "";
    }
}

export function nextMonth(elementId, order)
{
    const thisElement = document.getElementById(elementId);
    thisElement.innerHTML = russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) + 1)] ? russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) + 1)] : russianMonths[0];
    if(order === 1)
    {
        dateFrom.month = thisElement.innerHTML;
    }
    else
    {
        dateTo.month = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
}
export function prevMonth(elementId, order)
{
    const thisElement = document.getElementById(elementId);
    thisElement.innerHTML = russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) - 1)] ? russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) - 1)] : russianMonths[11];
    if(order === 1)
    {
        dateFrom.month = thisElement.innerHTML;
    }
    else
    {
        dateTo.month = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
}
export function prevYear(elementId, order)
{
    const thisElement = document.getElementById(elementId);
    thisElement.innerHTML = Number(thisElement.innerHTML) - 1;
    if(order === 1)
    {
        dateFrom.year = thisElement.innerHTML;
    }
    else
    {
        dateTo.year = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
}
export function nextYear(elementId, order)
{
    const thisElement = document.getElementById(elementId);
    thisElement.innerHTML = Number(thisElement.innerHTML) + 1;
    if(order === 1)
    {
        dateFrom.year = thisElement.innerHTML;
    }
    else
    {
        dateTo.year = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
}
export function generateYearSelector(thisElementId, selectorElementId, order)
{
    const thisElement = document.getElementById(thisElementId);
    const selectorElement = document.getElementById(selectorElementId);

    for(let i = 0; i < 15; i++)
    {
        const li = document.createElement("li");
        const p = document.createElement("p");
        li.addEventListener("click", changeYear.bind(window, li, thisElementId, selectorElementId, "year", order));
        p.innerHTML = Number(thisElement?.innerHTML) - i;
        li.appendChild(p);
        selectorElement?.appendChild(li);
    }
}
export function changeYear(thisElement, changeElementId, selectorElementId, type, order)
{
    document.getElementById(changeElementId).innerHTML = thisElement.innerHTML;
    toggleSelector(selectorElementId, selectorElementId + "-img");
    if(order === 1)
    {
        dateFrom[type] = thisElement.querySelector('p').textContent;
    }
    else
    {
        dateTo[type] = thisElement.querySelector('p').textContent;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
}
export function toggleSelector(selector, imgId)
{
    if(prevSelector !== selector)
    {
        removeAllTheClassesFromSelectors();
    }
    document.getElementById(imgId)?.classList.toggle("active")
    if(document.getElementById(selector))
    {
        document.getElementById(selector).classList.toggle("active")
    }
    else 
    {
        selector.classList.toggle("active")
    }
    prevSelector = selector;
}

export function selectDay(thisElement, order)
{
    let allElements = document.getElementsByClassName("calendar__item-" + order);
    for(let i = 0; i < allElements.length; i++)
    {
        allElements[i].classList.remove("selected")
    }
    thisElement.classList.add("selected")
    if(order === 1)
    {
        dateFrom.day = Number(thisElement.querySelector('p').textContent);
    }
    else
    {
        dateTo.day = Number(thisElement.querySelector('p').textContent);
    }
}

export function submitDate()
{
    const input1 = document.getElementById("date-input-1");
    const input2 = document.getElementById("date-input-2");
    input1.value = dateFrom.day + " " + dateFrom.month + " " + dateFrom.year;
    input2.value = dateTo.day + " " + dateTo.month + " " + dateTo.year;
    input1.classList.add = "active";
    input2.classList.add = "active";
}

function removeAllTheClassesFromSelectors()
{
    document.getElementById("month-selector").classList.remove("active")
    document.getElementById("year-selector").classList.remove("active")
    document.getElementById("month-2-selector").classList.remove("active")
    document.getElementById("year-2-selector").classList.remove("active")
    document.getElementById("month-selector-img").classList.remove("active")
    document.getElementById("year-selector-img").classList.remove("active")
    document.getElementById("month-2-selector-img").classList.remove("active")
    document.getElementById("year-2-selector-img").classList.remove("active")
}