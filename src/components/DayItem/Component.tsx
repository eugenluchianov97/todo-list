import React, {useEffect, useState} from "react";
import _month from "../../dictionares/month";
import _weekDaysFull from "../../dictionares/weekDaysFull";


import {getFromJSON} from "../../helper";
interface DaiItemProps {
    day:any,
    closeModal:() => void
}
export default  (props:DaiItemProps) => {
    const month:any = _month;
    const weekDaysFull:any = _weekDaysFull;

    const [items, setItems] = useState<any>([])
    const [editedId, setEditedId] = useState<any>(null)

    useEffect( () => {
        const results = getFromJSON('ITEMS').filter(obj => {
            return obj.day === props.day.date && obj.month === props.day.month && obj.year === props.day.year ;
        });

       setItems(results);
    }, [props])


    const editItem = (id:number) => {
        setEditedId(id)
        const result = getFromJSON('ITEMS').filter(obj => {
            return obj.id === id;
        });

        console.log(result);
    }

    return (
        <>
            <div className="w-4/6 bg-white p-4 shadow-xl relative">
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




                <div className="my-16 h-full overflow-y-auto h-96 mx-4" >
                    { items.length > 0 && items.map((item:any, idx:number) => {
                        return (
                            <div className="border border-slate-300 rounded p-3 my-1 select-none flex items-center justify-between" >
                               <div className="flex items-center">
                                   <div className="text-xl font-medium mx-1">
                                       {++idx}.
                                   </div>
                                   <div className="mx-2 w-full">
                                       <p className="font-medium">
                                           {editedId !== item.id && (
                                             <>  {item.subject} </>
                                           )}

                                           {editedId == item.id && (
                                               <input className="border border-slate-300 outline-none w-full" onChange={() => {}} value={item.subject} type="text"/>
                                           )}

                                       </p>
                                       <div className="text-sm font-light">
                                           {editedId !== item.id && (
                                               <> {item.text} </>
                                           )}

                                           {editedId == item.id && (
                                               <textarea className="border border-slate-300 w-full outline-none w-full">
                                               {item.text}
                                               </textarea>
                                           )}


                                       </div>
                                   </div>
                               </div>
                                <div className="flex items-between justify-center">
                                    <div className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                        <i className="fa fa-trash text-red-500"></i>
                                    </div>
                                    <div onClick={() => {editItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                        <i className="fa fa-pencil text-blue-500"></i>
                                    </div>

                                    <div className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                        <i className="fa fa-check text-green-500"></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }

                    {
                        items.length === 0 && (
                            <div className="border border-slate-300 rounded p-3 my-1 select-none flex items-center justify-center" >
                                <p>Нет записей</p>
                            </div>
                        )
                    }
                </div>


                <div className="w-16 h-16 bg-teal-300 rounded-full -mb-12 mx-auto flex items-center justify-center">
                    <i className="fa fa-check text-white text-2xl cursor-pointer"></i>
                </div>
            </div>

        </>
    )
}
