import "./style.css"
import React, {FC, useEffect, useState} from "react";

import DayItem from "./../DayItem/Component"

import _weekDays from "./../../dictionares/weeksDays"
import _weekDaysFull from "./../../dictionares/weekDaysFull"
import _month from "./../../dictionares/month"
import {getFromJSON} from "../../helper";

import axios from 'axios'
import Login from "../Login/Component";
interface CalendarProps {
    modal: boolean,
    openModal:(element: JSX.Element) => void,
    closeModal:() => void

}
export default (props:CalendarProps) => {

    useEffect(() => {
        console.log("Calendar")
    },[])



    const weekDays :any = _weekDays;
    const weekDaysFull:any = _weekDaysFull;
    const month:any = _month;

    const data = getFromJSON('ITEMS')


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

    const dateInPast = function(selectedDate:Date) {
        let now = new Date();
        now.setHours(0,0,0,0);
        return selectedDate < now;


    };

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
                    past:dateInPast(new Date( currentYear,currentMonth-1,date))
                })
            }
        }

        for(let i:number = 1;i <= getDaysInMonth(currentYear,currentMonth);i++){

            let day:number = new Date(currentYear, currentMonth, i).getDay()

            days.push({
                date:i,
                day:dayOfWeek(day),
                active:true,
                year:currentYear,
                month:currentMonth,
                today:i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear(),
                past:dateInPast(new Date( currentYear,currentMonth,i))
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
                    past:dateInPast(new Date( currentYear,currentMonth+1,date))
                })
            }
        }



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

    const closeModal = () => {
        props.closeModal()
    }


    const openDay = (day:any):void => {
        //только если день в будующем или сегодня
        if(!dateInPast(new Date( day.year,day.month,day.date))){
            props.openModal(<DayItem day={day} closeModal={closeModal} />)
        }
        else{
            alert("Нельзя вешать задания на прошлое!")
        }


    }


    let className = "container w-3/4 flex flex-col sm:flex-row bg-teal-300 m-auto  " + (props.modal ? "blur-sm" : "")

    return (

        <div className={className}>

            <div className="flex flex-col items-center justify-center w-full sm:w-4/12 bg-teal-300 ">

                <h1 className="uppercase font-light text-white m-3 sm:m-6 select-none">{weekDaysFull[dayOfWeek(today.getDay())]}</h1>
                <p className="font-light text-8xl sm:text-9xl text-white mb-4 sm:mb-8 select-none">{currentDay}</p>
            </div>
            <div className=" w-full sm:w-8/12 bg-white relative">

                <div className="prev-next-container flex justify-around items-center p-8">
                    <button onClick={prevMonth}>
                        <i className="fa fa-chevron-left text-slate-300 font-bold text-4xl"></i>
                    </button>
                    <p className="text-xl text-teal-600 uppercase font-semibold">{month[currentMonth]} {currentYear}</p>
                    <button onClick={nextMonth}>
                        <i className="fa fa-chevron-right text-slate-300 font-bold text-4xl"></i>
                    </button>
                </div>

                <div className="days-container mx-auto">
                    {Object.entries(weekDays).map((day:any, idx) => {
                        return (
                            <div key={idx} className="day-heading select-none font-semibold text-pink-600 flex items-center justify-center m-1">{day[1]}</div>
                        )
                    })}
                </div>


                <div className="days-container mx-auto pb-8">

                    {
                        renderList().map((day, idx) => {


                            let count = 0;
                            data.filter((el:any) => {
                                if(el.day === day.date && el.month === day.month && el.year === day.year && !el.done && !day.past ){

                                    count++
                                }

                            })


                            let dayClass:string = "day m-1 flex items-center justify-center cursor-pointer font-medium relative rounded-full border ";
                            let disabledClass = 'opacity-50 text-slate-600 ';
                            let todayClass = ' text-pink-600 border-pink-600  bg-pink-200  font-semibold   ';
                            let pastClass = "opacity-1 text-slate-700 border-slate-700  bg-slate-200 line-through ";

                            if(!day.active && day.past){
                                className = dayClass+pastClass+disabledClass;
                            }
                            else if(day.past){
                                className =  dayClass+pastClass;
                            }
                            else if(!day.active){
                                className = dayClass+disabledClass;
                            }

                            else if(day.today){
                                className = dayClass+todayClass;
                            }
                            else {
                                className = dayClass
                            }

                            return (

                                <div key={idx} onClick={() => {openDay(day)}} className={className}>
                                    {day.date}
                                    {count > 0 && (
                                        <div className="absolute w-4 h-4 -top-1 -right-1 bg-yellow-400 rounded-full text-xs flex items-center justify-center ">
                                            {count}
                                        </div>
                                    )}

                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
}
