import "./style.css"
import React, {FC, useState} from "react";

import AddItem from "./../AddItem/Component"
import DayItem from "./../DayItem/Component"

import _weekDays from "./../../dictionares/weeksDays"
import _weekDaysFull from "./../../dictionares/weekDaysFull"
import _month from "./../../dictionares/month"
interface CalendarProps {
    modal: boolean,
    openModal:(element: JSX.Element) => void

}
export default (props:CalendarProps) => {

    const weekDays :any = _weekDays;
    const weekDaysFull:any = _weekDaysFull;
    const month:any = _month;


    const today:Date = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const getDaysInMonth = (year:number, month:number) => {
        return new Date(year, month+1, 0).getDate();
    }

    const currentDay = today.getDate()
    const dayOfWeek = (day:number) => {
        return (day === 0) ? 7 : day
    }

    const renderList = () => {
        let days:any[] = [];
        let lastDayLastMonth:any = dayOfWeek(new Date(currentYear, currentMonth, 0).getDay());
        if(lastDayLastMonth != 7){
            for(let i = lastDayLastMonth;i > 0;i--){
                let date:number = new Date(currentYear, currentMonth, 1 - i ).getDate()
                let day:number = new Date(currentYear, currentMonth, 1 - i ).getDay()
                days.push({
                    date:date,
                    day:dayOfWeek(day),
                    active:false,
                    year:currentYear,
                    month:currentMonth-1,
                    today:false,
                    past:currentYear < today.getFullYear() ||
                        (currentYear === today.getFullYear() && currentMonth < today.getMonth() ) ||
                        (currentYear === today.getFullYear() && currentMonth === today.getMonth() &&  i < today.getDate())
                })
            }
        }

        for(let i:number = 1;i <= getDaysInMonth(currentYear,currentMonth);i++){

            let day:number = new Date(currentYear, currentMonth, i).getDay()
            //если год меньше
            days.push({
                date:i,
                day:dayOfWeek(day),
                active:true,
                year:currentYear,
                month:currentMonth,
                today:i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear(),
                past:currentYear < today.getFullYear() ||
                    (currentYear === today.getFullYear() && currentMonth < today.getMonth() ) ||
                    (currentYear === today.getFullYear() && currentMonth === today.getMonth() &&  i < today.getDate())
            })
        }

        let daysCount:number = getDaysInMonth(currentYear,currentMonth)
        let firstDayNextMonth:number = dayOfWeek(new Date(currentYear, currentMonth, daysCount + 1).getDay());

        if(firstDayNextMonth != 1){

            for(let i:number = firstDayNextMonth, d:number = 1;i <= 7;i++,d++){
                let date:number = new Date(currentYear, currentMonth, daysCount + d ).getDate()
                let day:number = new Date(currentYear, currentMonth, daysCount + d ).getDay()
                days.push({
                    date:date,
                    day:dayOfWeek(day),
                    active:false,
                    month:currentMonth+1,
                    year:currentYear,
                    today:false,
                    past:currentYear < today.getFullYear() ||
                        (currentYear === today.getFullYear() && currentMonth < today.getMonth() ) ||
                        (currentYear === today.getFullYear() && currentMonth === today.getMonth() &&  i < today.getDate())
                })
            }
        }

        console.log(days)
        return days;
    }

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


    const openDay = (day:any):void => {
        props.openModal(<DayItem day={day}/>)
    }

    const addItem = ():void => {
        props.openModal(<AddItem />)
    }

    let className = "container flex bg-teal-300 m-auto  " + (props.modal ? "blur-sm" : "")

    return (

        <div className={className}>

            <div className="flex flex-col items-center justify-center w-4/12 bg-teal-300 ">

                <h1 className="uppercase font-light text-white m-6 select-none">{weekDaysFull[today.getDay()]}</h1>
                <p className="font-light text-9xl text-white mb-8 select-none">{currentDay}</p>
            </div>
            <div className="w-8/12 bg-white relative">

                <div className="prev-next-container flex justify-around items-center p-8">
                    <button onClick={prevMonth}>
                        <i className="fa fa-chevron-left text-slate-300 font-bold text-4xl"></i>
                    </button>
                    <p className="text-xl text-teal-600 uppercase font-semibold">{month[currentMonth]} {currentYear}</p>
                    <button onClick={nextMonth}>
                        <i className="fa fa-chevron-right text-slate-300 font-bold text-4xl"></i>
                    </button>
                </div>

                <div className="days-container">
                    {Object.entries(weekDays).map((day:any, idx) => {
                        return (
                            <div key={idx} className="day-heading select-none font-semibold text-pink-600 flex items-center justify-center m-1">{day[1]}</div>
                        )
                    })}
                </div>


                <div className="days-container pb-8">

                    {
                        renderList().map((day, idx) => {
                            let disabledClass = 'text-slate-400 ';
                            let todayClass = 'border-4 font-semibold rounded-full border-pink-600 bg-pink-200 text-pink-600  ';
                            let pastClass = "border-4  rounded-full border-slate-100  bg-slate-100 ";


                            let className:string = "day m-1  flex items-center justify-center cursor-pointer font-medium ";
                            if(!day.active){
                                className += disabledClass
                            }
                            if(day.past){
                                className += pastClass
                            }


                            className = className + (day.today  ? todayClass : '' )
                            return (

                                <div key={idx} onClick={() => {openDay(day)}} className={className}>{day.date}</div>
                            )
                        })
                    }
                </div>
                <div onClick={addItem} className="w-16 h-16 bg-teal-300 rounded-full -mb-8 -mr-8 flex items-center justify-center absolute bottom-0 right-0">
                    <i className="fa fa-plus text-white text-2xl cursor-pointer"></i>
                </div>
            </div>

        </div>
    );
}
