import React, {useState} from 'react';
import './App.css';


import Calendar from "./components/Calendar/Component"

function App() {

    const weekDays:any = {
        0:"ВС",
        1:"ПН",
        2:"ВТ",
        3:"СР",
        4:"ЧТ",
        5:"ПТ",
        6:"СБ",

    }
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const month:any = {
        0:"Январь",
        1:"Февраль",
        2:"Март",
        3:"Апрель",
        4:"Май",
        5:"Июнь",
        6:"Июль",
        7:"Август",
        8:"Сентябрь",
        9:"Октябрь",
        10:"Ноябрь",
        11:"Декабрь",
    }

    const getDaysInMonth = (year:number, month:number) => {
        return new Date(year, month+1, 0).getDate();
    }


    // const currentDay = today.getDay()
    const currentDay = today.getDate()

    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDay(); //трицательные значения берут прошлый месяц
    const firstDayOfThisMonth = new Date(currentYear, currentMonth, 1).getDay(); //трицательные значения берут прошлый месяц
    const lastDayOfThisMonth = new Date(currentYear, currentMonth, getDaysInMonth(currentYear, currentMonth)).getDay(); //трицательные значения берут прошлый месяц
    const firstDayOfNextMonth = new Date(currentYear, currentMonth, getDaysInMonth(currentYear, currentMonth) + 1).getDay();

    console.log('lastDayOfPrevMonth = ', lastDayOfPrevMonth)
    console.log('firstDayOfThisMonth = ', firstDayOfThisMonth)
    //console.log('firstDayOfNextMonth = ', firstDayOfNextMonth)

    const render = () => {

        let daysInMonth = getDaysInMonth(currentYear, currentMonth);

        let obj = [];
        for(let i = 1;i <= daysInMonth;i++ ){
            obj.push({
                dayOfWeek:new Date(currentYear, currentMonth, i).getDay(),
                day:i
            })
        }

        return obj;
    }


    console.log('render = ',render())

    //если текущий  первый день это среда

    const nextMonth = () => {
        if(currentMonth + 1 > 11){
            setCurrentMonth(0);
            setCurrentYear(currentYear+1)
        }
        else{
            setCurrentMonth(currentMonth + 1)
        }
    }

    const prevMonth = () => {
        if(currentMonth - 1 < 0){
            setCurrentMonth(11);
            setCurrentYear(currentYear-1)
        }
        else{
            setCurrentMonth(currentMonth - 1)
        }
    }
    //первый день прошлого месяца который был пн (индекс 1)

    const getLastDays = (lastDayOfPrevMonth:number) => {
        let getLastDays:any = [];
        //если первый день недели это пн , то нам не нужны предыдущие дни
        if(lastDayOfPrevMonth > 0){
            for(let i = 1;i<=lastDayOfPrevMonth;i++){
                getLastDays.push(weekDays[i])
            }
        }

        return getLastDays;
    }

    const getNextDays = (firstDayOfNextMonth:number) => {
        console.log(firstDayOfNextMonth + '-------------------')
        let getLastDays:any = [];
        //если первый день недели это пн (1) , то нам не нужны следующие дни
        if(firstDayOfNextMonth === 1 ){
            for(let i = 1;i<=firstDayOfNextMonth;i++){
                getLastDays.push(weekDays[i])
            }
        }

        return getLastDays;
    }

    console.log(getLastDays(lastDayOfPrevMonth))
    console.log(getNextDays(firstDayOfNextMonth))


    return (
    <div>
        Первый день месяца - {weekDays[firstDayOfNextMonth]}<br/>
        Количество дней в месяце - {getDaysInMonth(currentYear,currentMonth)}<br/>
        {currentDay}/ {month[currentMonth]}/ {currentYear}

        <br/>Количество дней в месяце
        {getDaysInMonth(currentYear,currentMonth)}


        <br/>
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>

        {lastDayOfPrevMonth}
        <div className="container">
            <div className="day">ПН</div>
            <div className="day">ВТ</div>
            <div className="day">СР</div>
            <div className="day">ЧТ</div>
            <div className="day">ПТ</div>
            <div className="day">СБ</div>
            <div className="day">ВС</div>
            {render().map((day,idx) => {
                return (
                    <div className="day" key={idx}>{day.day}</div>
                )
            })}
        </div>


    </div>
    );
}

export default App;
