import "./style.css"
import React, {FC, useContext, useEffect, useState} from "react";

import DayItem from "./../DayItem/Component"

import _weekDays from "./../../dictionares/weeksDays"
import _weekDaysFull from "./../../dictionares/weekDaysFull"
import _month from "./../../dictionares/month"
import {getFromJSON} from "../../helper";

import ModalContext from "../../contexts/ModalContext";
import useAsyncEffect from "use-async-effect";
import {itemsIndex, itemsTasks} from "../../api";
import UserContext from "../../contexts/UserContext";
import TasksContext from "../../contexts/TasksContext";

import AddItem from "./../AddItem/Component"
import MonthContext from "../../contexts/MonthContext";
export default () => {

    const weekDays :any = _weekDays;
    const weekDaysFull:any = _weekDaysFull;
    const month:any = _month;

    const {user, _setUser} = useContext<any>(UserContext);
    const {modal, _setModal} = useContext<any>(ModalContext);
    const {tasks, _setTasks} = useContext<any>(TasksContext);

    const {currentMonth, _setMonth} = useContext<any>(MonthContext);


    const today:Date = new Date();

    //const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const [loading, setLoading] = useState<boolean>(false)





    const currentDay = today.getDate()

    useAsyncEffect(async () => {
        _setTasks([]);
        let result2 = await itemsTasks(currentMonth,currentYear);



        if(result2.status === 200){
            _setTasks(result2.data.items);
        }
        setLoading(false)
    }, [currentMonth,user])



    const getDaysInMonth = (year:number, month:number) => {
        return new Date(year, month+1, 0).getDate();
    }


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

    const nextMonth = async () => {
        setLoading(true)
        if(currentMonth + 1 > 11){
            _setMonth(0);
            setCurrentYear(currentYear+1)
        }
        else{
            _setMonth(currentMonth + 1)
        }

    }



    const prevMonth = async () => {
        setLoading(true)
        if(currentMonth - 1 < 0){
            _setMonth(11);
            setCurrentYear(currentYear-1)
        }
        else{
            _setMonth(currentMonth - 1)
        }

    }


    const openDay = (day:any):void => {
        _setModal(<DayItem day={day} />)
    }

    const addItem = () => {
        _setModal(<AddItem/>)
    }

    return (

        <div className={"container w-3/4 flex flex-col sm:flex-row bg-slate-300 m-auto  " + (modal ? "blur-sm" : "")}>

            <div className="flex flex-col items-center justify-center w-full sm:w-4/12 bg-slate-700 ">

                <h1 className="uppercase font-light text-white m-3 sm:m-6 select-none">{weekDaysFull[dayOfWeek(today.getDay())]}</h1>
                <p className="font-light text-8xl sm:text-9xl text-white mb-4 sm:mb-8 select-none">{currentDay}</p>
            </div>
            <div className=" w-full sm:w-8/12 bg-white relative">

                <div className="prev-next-container flex justify-around items-center p-8">
                    <button onClick={prevMonth}>
                        <i className="fa fa-chevron-left text-slate-300 font-bold text-4xl"></i>
                    </button>
                    <p className="text-xl text-slate-700 uppercase font-semibold">{month[currentMonth]} {currentYear}</p>
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


                <div className="days-container mx-auto pb-8 mb-8">

                    {
                        renderList().map((day, idx) => {

                            let className;
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


                            let count = 0;

                            tasks.map((task:any) => {

                                if(parseInt(task.day) === parseInt(day.date) && parseInt(task.month) === parseInt(day.month)+1 && parseInt(task.year) === parseInt(day.year)){
                                    count++
                                }
                            })


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

                <div onClick={addItem} className="absolute w-8 h-8 -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 cursor-pointer sm:w-16 sm:h-16 bg-slate-700 rounded-full flex items-center justify-center">
                    <i className="fa fa-plus text-white text-2xl "></i>
                </div>
                {loading && (
                    <div className="flex bg-white opacity-50 items-center justify-center absolute top-0 left-0 bottom-0 right-0" role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-slate-700"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}


            </div>

        </div>
    );
}
