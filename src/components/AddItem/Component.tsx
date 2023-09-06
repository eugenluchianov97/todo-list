import React, {useEffect, useState} from "react";
import _month from "../../dictionares/month";

export default  () => {
    const month:any = _month;
    const D =  (M:number) => {
        let d:any = [];
        for(let i = 1;i <= new Date(currentYear, M+1, 0).getDate();i++){
            d.push(i)
        }
        return d
    }




    const today:Date = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [days, setDays] = useState( new Date(currentYear, currentMonth+1, 0).getDate())





    const setMonth = (_month:any) => {

        setCurrentMonth(_month)
        console.log(currentMonth)
        setDays(new Date(currentYear, currentMonth+1, 0).getDate())
    }

    return (
        <>
            <div className="my-16">
                <div className="flex">
                    <select className="border border-slate-300 w-1/6 p-2 rounded-md outline-0  text-slate-700 ">
                        {Array.from(Array(days), (el, idx) => {

                            return  <option key={idx} value={idx+1}>{idx+1}</option>
                        })}


                    </select>
                    <select onChange={(e:any) => setMonth(e.target.value)} defaultValue={currentMonth} className="border border-slate-300 w-3/6 p-2 mx-2 rounded-md outline-0  text-slate-700 ">
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

                <input className="border border-slate-300 w-full p-2 my-2 rounded-md outline-0  text-slate-700 " type="text" placeholder="Subject"/>

                <textarea className="border border-slate-300 w-full p-2 my-2 rounded-md outline-0  text-slate-700 h-60" placeholder="Description">

                    </textarea>
            </div>


            <div className="w-16 h-16 bg-teal-300 rounded-full -mb-12 mx-auto flex items-center justify-center">
                <i className="fa fa-check text-white text-2xl cursor-pointer"></i>
            </div>
        </>
    )
}
