import updateCalendar, { russianMonths } from "./updateCalendar.js";

let prevSelector = null;

let dateFrom = 
{
    year: 1999,
    month: "Октябрь",
    day: null
}
let dateTo = 
{
    year: 2023,
    month: "Сентябрь",
    day: null
}
// setInterval(() => { console.log(dateFrom, dateTo) }, 1000)
function fromObjToDate(obj)
{
    let date = new Date(obj.year + "-" + (russianMonths.findIndex(month => month === obj.month) + 1) + "-" + (obj.day || 1));
    if(obj.day === null)
        date.getDate = function() { return null }
    return date;
}
export function showCalendars()
{
    document.getElementById("calendars").classList.add("active");
    document.getElementById("date-input-1").placeholder = "ДД.ММ.ГГГГ";
    document.getElementById("date-input-2").placeholder = "ДД.ММ.ГГГГ";
}
export function hideCalendars()
{
    document.getElementById("calendars").classList.remove("active");
    if(document.getElementById("date-input-1").placeholder === "ДД.ММ.ГГГГ")
    {
        document.getElementById("date-input-1").placeholder = "";
        document.getElementById("date-input-2").placeholder = "";
        document.getElementById("date-input-1").value = "";
        document.getElementById("date-input-2").value = "";
    }
}

export function nextMonth(elementId, order)
{
    const date = new Date();
    const thisElement = document.getElementById(elementId);
    if(
        (order === 1 && getDateValues()[0] + (1 / 13) > getDateValues()[1]) ||
        !russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) + 1)]
    )
    {
        return
    }
    thisElement.innerHTML = russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) + 1)];
    if(order === 1)
    {
        dateFrom.month = thisElement.innerHTML;
    }
    else
    {
        dateTo.month = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
    checkButtons(order, (+Number(document.getElementById("year-2").innerHTML) + 1 > date.getFullYear()))
}
export function prevMonth(elementId, order)
{
    const date = new Date();
    const thisElement = document.getElementById(elementId);
    if(
        (order === 2 && getDateValues()[0] > getDateValues()[1] - (1 / 13)) ||
        !russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) - 1)]
    )
    {
        return
    }
    thisElement.innerHTML = russianMonths[(russianMonths.findIndex(i => i === thisElement.innerHTML) - 1)];
    if(order === 1)
    {
        dateFrom.month = thisElement.innerHTML;
    }
    else
    {
        dateTo.month = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo))
    checkButtons(order, (+Number(document.getElementById("year-2").innerHTML) + 1 > date.getFullYear()))
}
export function prevYear(elementId, order)
{
    const date = new Date();
    const thisElement = document.getElementById(elementId);
    if(
        (order === 2 && getDateValues()[0] > getDateValues()[1] - 1)
    )
    {
        return
    }
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
    checkButtons(order, (+Number(document.getElementById("year-2").innerHTML) + 1 > date.getFullYear()))
}
export function nextYear(elementId, order)
{
    const date = new Date();
    const thisElement = document.getElementById(elementId);
    if(
        Number(thisElement.innerHTML) + 1 > date.getFullYear() ||
        (order === 1 && getDateValues()[0] + 1 > getDateValues()[1])
    )
    {
        return
    }
    thisElement.innerHTML = Number(thisElement.innerHTML) + 1;
    if(order === 1)
    {
        dateFrom.year = thisElement.innerHTML;
    }
    else
    {
        dateTo.year = thisElement.innerHTML;
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo), 0, 0)
    checkButtons(order, (+Number(document.getElementById("year-2").innerHTML) + 1 > date.getFullYear()))
}
export function generateYearSelector(thisElementId, selectorElementId, order)
{
    const thisElement = document.getElementById(thisElementId);
    const selectorElement = document.getElementById(selectorElementId);

    
    while (selectorElement.firstChild) {
        selectorElement.removeChild(selectorElement.firstChild);
    };

    const date = new Date();

    let i = date.getFullYear();
    while(i > Number(thisElement?.innerHTML))
    {
        const li = document.createElement("li");
        const p = document.createElement("p");
        li.addEventListener("click", changeYear.bind(window, li, thisElementId, selectorElementId, "year", order));
        p.innerHTML = i;
        li.appendChild(p);
        selectorElement?.appendChild(li);
        i--;
    }
    for(i = 0; i <= 15; i++)
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
    input1.placeholder = "";
    input2.placeholder = "";
    if(dateFrom.day !== null)
    {
        input1.value = dateFrom.day + " " + dateFrom.month + " " + dateFrom.year;
        input1.classList.add("active");
        document.getElementById("date-input-container-1").classList.add("active");
    }
    else
    {
        input1.classList.remove("active");
        document.getElementById("date-input-container-1").classList.remove("active");
        input1.value = "";
    }
    if(dateTo.day !== null)
    {
        input2.value = dateTo.day + " " + dateTo.month + " " + dateTo.year;
        input2.classList.add("active");
        document.getElementById("date-input-container-2").classList.add("active");
    }
    else
    {
        input2.classList.remove("active");
        document.getElementById("date-input-container-2").classList.remove("active");
        input2.value = "";
    }
}

export function submitDateFromInput(thisElement, order)
{
    if(order === 1)
    {
        const date = thisElement.value.split(".");
        dateFrom.day = Number(date[0]);
        dateFrom.month = russianMonths[Number(date[1]) - 1];
        dateFrom.year = Number(date[2]);
    }
    else
    {
        const date = thisElement.value.split(".");
        dateTo.day = Number(date[0]);
        dateTo.month = russianMonths[Number(date[1]) - 1];
        dateTo.year = Number(date[2]);
    }
    updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo), true, true)
    if(getDateValues()[0] > getDateValues()[1] && (dateFrom.day !== null && dateTo.day !== null))
    {
        document.getElementById('error-message-2').textContent = 'Дата начала периода ппревиышает дату окончания';
    }
}

export function nullDate(order)
{
    if((dateTo.day === null && order === 1) || (dateFrom.day === null && order === 2)) 
    {
        dateTo.day = null;
        dateFrom.day = null;
        updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo), 0, 0)
    }
    else
    {
        if(order === 1)
        {
            dateFrom.day = null;
            if(document.getElementById('error-message'))
                document.getElementById('error-message').textContent = '';
            updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo), true, 0)
        }
        if(order === 2)
        {
            dateTo.day = null;
            if(document.getElementById('error-message-2'))
                document.getElementById('error-message-2').textContent = '';
            updateCalendar(fromObjToDate(dateFrom), fromObjToDate(dateTo), 0, true)
        }
    }
    submitDate()
}

export function dateFormSubmit()
{
    document.getElementById('date-input-container-1').addEventListener('submit', function(event) {
        event.preventDefault();
    });
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

function checkButtons(order, isLastYear)
{
    if(order === 1)
    {
        if((getDateValues()[0] + (1 / 13) > getDateValues()[1]))
        {
            document.getElementById("next-month-button").classList.add("disabled")
            document.getElementById("prev-month-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-month-button").classList.remove("disabled")
            document.getElementById("prev-month-button-2").classList.remove("disabled")
        }
        if(getDateValues()[0] + 1 > getDateValues()[1])
        {
            document.getElementById("next-year-button").classList.add("disabled")
            document.getElementById("prev-year-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-year-button").classList.remove("disabled")
            document.getElementById("prev-year-button-2").classList.remove("disabled")
        }
        if(isLastYear)
        {
            document.getElementById("next-year-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-year-button-2").classList.remove("disabled")
        }
        if(russianMonths.findIndex(month => month === dateFrom.month) === 0)
        {
            document.getElementById("prev-month-button").classList.add("disabled")
        }
        else
        {
            document.getElementById("prev-month-button").classList.remove("disabled")
        }
        if(russianMonths.findIndex(month => month === dateFrom.month) === 11)
        {
            document.getElementById("next-month-button").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-month-button").classList.remove("disabled")
        }
    } 
    else 
    {
        if(getDateValues()[0] > getDateValues()[1] - (1 / 13))
        {
            document.getElementById("next-month-button").classList.add("disabled")
            document.getElementById("prev-month-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-month-button").classList.remove("disabled")
            document.getElementById("prev-month-button-2").classList.remove("disabled")
        }
        if(getDateValues()[0] > getDateValues()[1] - 1)
        {
            document.getElementById("next-year-button").classList.add("disabled")
            document.getElementById("prev-year-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-year-button").classList.remove("disabled")
            document.getElementById("prev-year-button-2").classList.remove("disabled")
        }
        if(isLastYear)
        {
            document.getElementById("next-year-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-year-button-2").classList.remove("disabled")
        }
        if(russianMonths.findIndex(month => month === dateTo.month) === 0)
        {
            document.getElementById("prev-month-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("prev-month-button-2").classList.remove("disabled")
        }
        if(russianMonths.findIndex(month => month === dateTo.month) === 11)
        {
            document.getElementById("next-month-button-2").classList.add("disabled")
        }
        else
        {
            document.getElementById("next-month-button-2").classList.remove("disabled")
        }
    }
}

function getDateValues()
{
    const year1 = +document.getElementById("year").innerHTML;
    const year2 = +document.getElementById("year-2").innerHTML;
    const month1 = russianMonths.findIndex(month => month === document.getElementById("month").innerHTML) + 1;
    const month2 = russianMonths.findIndex(month => month === document.getElementById("month-2").innerHTML) + 1;
    const firstDateValue = year1 + (month1 / 13);
    const secondDateValue = year2 + (month2 / 13);
    return [firstDateValue, secondDateValue];
}