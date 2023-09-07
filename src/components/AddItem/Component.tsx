import React, {useEffect, useState} from "react";
import _month from "../../dictionares/month";

import {setItem} from "./../../helper"
interface AddItemProps {
    closeModal:() => void
}
export default  (props:AddItemProps) => {
    const month:any = _month;


    const today:Date = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [days, setDays] = useState(0)
    const [day, setDay] = useState(1)

    const [subject,setSubject] = useState('')
    const [text,setText] = useState('')


    useEffect(():void => {
        setDays(new Date(currentYear, Number(1 + parseInt(String(currentMonth))), 0).getDate())
    },[currentMonth,currentYear])
    interface dataObj {
        id:number,
        subject: string;
        text: string;
        day: number;
        month: number;
        year: number;
        done:boolean
    }
    const saveItem = () => {
        let data:dataObj = {
            id:Date.now(),
           subject:subject,
           text:text,
            day:day,
            month:currentMonth,
            year:currentYear,
            done:false
        }

        setItem(data)

        props.closeModal()
    }

    return (
        <>
            <div className="w-4/12 bg-white p-4 shadow-xl relative">
                <div className="my-16">
                    <div className="flex">
                        <select onChange={(e:any) => setDay(e.target.value)} className="border border-slate-300 w-1/6 p-2 rounded-md outline-0  text-slate-700 ">
                            {Array.from(Array(days), (el, idx) => {

                                return  <option key={idx} value={idx+1}>{idx+1}</option>
                            })}


                        </select>
                        <select onChange={(e:any) => setCurrentMonth(e.target.value)} defaultValue={currentMonth} className="border border-slate-300 w-3/6 p-2 mx-2 rounded-md outline-0  text-slate-700 ">
                            {
                                Object.entries(month).map((el:any,idx) => {
                                    return (
                                        <option key={idx} value={el[0]}>{el[1]}</option>
                                    )
                                })
                            }

                        </select>
                        <input value={currentYear} onChange={(e:any) => setCurrentYear(e.target.value)} className="border border-slate-300 w-2/6 p-2 rounded-md outline-0  text-slate-700 " type="number" placeholder="Year"/>
                    </div>

                    <input onChange={(e:any) => setSubject(e.target.value)} className="border border-slate-300 w-full p-2 my-2 rounded-md outline-0  text-slate-700 " type="text" placeholder="Subject"/>

                    <textarea onChange={(e:any) => setText(e.target.value)} className="border border-slate-300 w-full p-2 my-2 rounded-md outline-0  text-slate-700 h-60" placeholder="Description">

                    </textarea>
                </div>


                <div onClick={saveItem}className="w-16 h-16 bg-teal-300 rounded-full -mb-12 mx-auto flex items-center justify-center  cursor-pointer">
                    <i className="fa fa-check text-white text-2xl"></i>
                </div>
            </div>

        </>
    )
}
