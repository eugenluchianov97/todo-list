import React, {useEffect, useState} from "react";
import _month from "../../dictionares/month";
import _weekDaysFull from "../../dictionares/weekDaysFull";


import {getFromJSON, setItem, setToJSON} from "../../helper";
import {itemsIndex, itemsStore, itemsUpdate, itemsDelete, itemsComplete} from "../../api";


import AddItem from "./../AddItem/Component"
interface DaiItemProps {
    day:any,
    closeModal:() => void
}


export default  (props:DaiItemProps) => {
    const month:any = _month;
    const weekDaysFull:any = _weekDaysFull;

    const [items, setItems] = useState<any>([])
    const [editedId, setEditedId] = useState<any>(null)
    const [subject, setSubject] = useState<any>('')
    const [text, setText] = useState<any>('')

    const [newItem, setNewItem] = useState<any>(false)

    const [loading, setLoading] = useState(true)

    useEffect( () => {
        setLoading(true)
        setItems([])
        itemsIndex(props.day.date, props.day.month, props.day.year).then((res:any) => {
            if(res.status === 200){
                setItems(res.data.items);
            }
            setLoading(false)
        })
         setEditedId(null)
         setNewItem(false)
    }, [props])



    const editItem = (item:any) => {
        setEditedId(item.id)
        setSubject(item.subject)
        setText(item.text)
    }



    const saveEdited = async (day:any) => {
        setLoading(true)
        let data = {
            subject:subject,
            text:text,
            date:day.date,
            month:day.month,
            year:day.year,
            timestamp:new Date(day.year,day.month,day.date).getTime(),
            done:false
        }

        itemsUpdate(day.id,data).then((res:any) => {
            if(res.status === 200){
                itemsIndex(props.day.date, props.day.month, props.day.year).then((res:any) => {
                    if(res.status === 200){
                        setItems(res.data.items);
                    }
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }


        })


        setEditedId(null)

    }

    const completeItem = (id:number) => {
        setLoading(true)
        itemsComplete(id).then((res:any) => {
            if(res.status === 200){
                itemsIndex(props.day.date, props.day.month, props.day.year).then((res:any) => {
                    if(res.status === 200){

                        setItems(res.data.items);
                        setLoading(false)
                    }
                })
            }
        })


    }

    const deleteItem = (id:number) => {
        setLoading(true)
        itemsDelete(id).then((res:any) => {
            if(res.status === 200){
                itemsIndex(props.day.date, props.day.month, props.day.year).then((res:any) => {
                    if(res.status === 200){

                        setItems(res.data.items);
                        setLoading(false);
                    }
                })
            }
        })

    }

    const addItem = () => {
        setNewItem(true)
    }


    const closeModal = () => {

        props.closeModal();
    }

    return (
        <>
            <div className="w-4/5 sm:w-4/6 bg-white p-1 sm:p-4 shadow-xl relative">
                {loading && (
                    <div className="flex bg-white opacity-50 items-center justify-center absolute top-0 left-0 bottom-0 right-0" role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
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


                <div onClick={closeModal} className="cursor-pointer w-8 sm:w-16 h-8 sm:h-16 bg-teal-300 rounded-full -mt-5 sm:-mt-12  flex items-center justify-center absolute -right-4 sm:-right-8">
                    <i className="fa fa-close text-white text-2xl "></i>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center ">
                    <div className="flex items-center">
                        <div className=" text-lg sm:text-7xl text-slate-700 font-semibold">{props.day.date}</div>
                        <div className="ml-1 flex sm:flex-col">
                            <div className="text-lg sm:text-2xl font-medium text-slate-700">{month[props.day.month]}</div>
                            <div className="text-lg sm:text-xl font-medium sm:-mt-1 text-slate-700">{props.day.year}</div>
                        </div>
                    </div>


                    <div className="font-medium text-slate-700 ">{weekDaysFull[props.day.day]}</div>
                </div>


                <div className=" my-2 sm:my-16 h-full overflow-y-auto h-80 sm:h-96 mx-1 sm:mx-4" >
                    { items.length > 0 && items.map((item:any, idx:number) => {
                        let className = "border border-slate-300 rounded p-1 sm:p-3 my-1 select-none flex items-center justify-between " + (item.done ? 'bg-green-300':'');
                        return (
                            <div key={idx} className={className} >
                               <div className="flex items-center w-full">
                                   <div className="text-xl font-medium mx-1">
                                       {++idx}.
                                   </div>
                                   <div className="mx-2 w-full">
                                       <p className="font-medium">
                                           {editedId !== item.id && (
                                             <>  {item.subject} </>
                                           )}

                                           {editedId == item.id && (
                                               <input className=" p-1 border border-slate-300 outline-none w-full" onChange={(e) => {setSubject(e.target.value)}} value={subject} type="text"/>
                                           )}

                                       </p>
                                       <div className="text-sm font-light">
                                           {editedId !== item.id && (
                                               <> {item.text} </>
                                           )}

                                           {editedId == item.id && (
                                               <textarea value={text} onChange={(e) => {setText(e.target.value)}} className="mt-1 border border-slate-300 w-full outline-none w-full">

                                               </textarea>
                                           )}


                                       </div>
                                   </div>
                               </div>
                                <div className="flex flex-col sm:flex-row items-between justify-center ">
                                    {editedId !== item.id && (
                                        <>
                                            <div onClick={() => {deleteItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-trash text-red-500"></i>
                                            </div>
                                            <div onClick={() => {editItem(item)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-pencil text-blue-500"></i>
                                            </div>
                                            <div onClick={() => {completeItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-star text-yellow-500"></i>
                                            </div>
                                        </>
                                    )}
                                    {editedId === item.id && (
                                        <>
                                            <div onClick={() => {saveEdited(item)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-check text-green-500"></i>
                                            </div>
                                        </>
                                    )}



                                </div>
                            </div>
                        )
                    })}

                    {newItem && (
                        <AddItem props={props.day} close={() => {setNewItem(false);}}/>
                    )}

                    {items.length === 0 && (
                            <div className="border border-slate-300 rounded p-1 sm:p-3 my-1 select-none flex items-center justify-center" >
                                <p>Нет записей</p>
                            </div>
                        )
                    }
                </div>


                <div onClick={addItem } className="cursor-pointer w-8 sm:w-16 h-8 sm:h-16 bg-teal-300 rounded-full -mb-5 sm:-mb-12 mx-auto flex items-center justify-center">
                    <i className="fa fa-plus text-white text-2xl "></i>
                </div>
            </div>

        </>
    )
}
