import React from "react";
import _month from "../../dictionares/month";
import _weekDaysFull from "../../dictionares/weekDaysFull";

interface DaiItemProps {
    day:any
}
export default  (props:DaiItemProps) => {
    const month:any = _month;
    const weekDaysFull:any = _weekDaysFull;
    console.log(props)
    return (
        <>
            <div className="flex justify-between items-center ">
                <div className="flex items-center">
                    <div className="text-7xl text-slate-700 font-semibold">{props.day.date}</div>
                    <div className="ml-1">
                        <div className="text-2xl font-medium text-slate-700">{month[props.day.month]}</div>
                        <div className="text-xl font-medium -mt-1 text-slate-700">{props.day.year}</div>
                    </div>
                </div>


                <div className="font-medium text-slate-700 ">{weekDaysFull[props.day.day]}</div>
            </div>

            <div className="my-16">

                <div>Item 1</div>
            </div>


            <div className="w-16 h-16 bg-teal-300 rounded-full -mb-12 mx-auto flex items-center justify-center">
                <i className="fa fa-check text-white text-2xl cursor-pointer"></i>
            </div>
        </>
    )
}
