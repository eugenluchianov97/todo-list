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
        return new Date(year, month, 0).getDate();
    }


    // const currentDay = today.getDay()
    const currentDay = today.getDate()

    const firstDayOfNextMonth = new Date(currentYear, currentMonth, 1).getDay();

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
    return (
    <div>
        Первый день месяца - {weekDays[firstDayOfNextMonth]}<br/>
        Количество дней в месяце - {getDaysInMonth(currentYear,currentMonth)}<br/>
        {/*{currentDay} {month[currentMonth]} {currentYear}*/}
        {currentDay}/ {month[currentMonth]}/ {currentYear}


        <br/>
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>




    </div>
    );
}

export default App;
