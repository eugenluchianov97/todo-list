import React, {useEffect, useState} from "react";
import _month from "../../dictionares/month";
import _weekDaysFull from "../../dictionares/weekDaysFull";


import {getFromJSON, setItem, setToJSON} from "../../helper";
interface DaiItemProps {
    day:any,
    closeModal:() => void
}

interface dataObj {
    id:number,
    subject: string;
    text: string;
    day: number;
    month: number;
    year: number;
    done:boolean
}


export default  (props:DaiItemProps) => {
    const month:any = _month;
    const weekDaysFull:any = _weekDaysFull;

    const [items, setItems] = useState<any>([])
    const [editedId, setEditedId] = useState<any>(null)
    const [subject, setSubject] = useState<any>('')
    const [text, setText] = useState<any>('')

    const [newItem, setNewItem] = useState<any>(false)
    const [newItemSubject, setNewItemSubject] = useState<any>('')
    const [newItemText, setNewItemText] = useState<any>('')

    useEffect( () => {
        setEditedId(null)
        setNewItem(false)

        const results = getItems()

       setItems(results);

    }, [props])

    const getItems = () =>{
        return  getFromJSON('ITEMS').filter((obj:any)=> {
            return obj.day === props.day.date && obj.month === props.day.month && obj.year === props.day.year ;
        });

    }


    const editItem = (item:any) => {
        setEditedId(item.id)
        setSubject(item.subject)
        setText(item.text)

    }



    const saveEdited = (id:number) => {
        const result:any = getFromJSON('ITEMS').filter((obj:any) => {
            if(obj.id === id && subject !== ""){
                obj.subject = subject;
                obj.text = text;
            }
            return obj;
        });


        setToJSON('ITEMS',result)

        setItems(getItems());

        setEditedId(null)

    }

    const deleteItem = (id:number) => {
        console.log('here')
        const result:any = getFromJSON('ITEMS').filter((obj:any,idx:number) => {
            if(obj.id !== id){
                return obj;
            }

        });



        setToJSON('ITEMS',result)

        setItems(getItems());

    }

    const addItem = () => {
        setNewItem(true)
    }


    const saveNewItem = () => {
        if(newItemSubject !== ""){
            let data:dataObj = {
                id:Date.now(),
                subject:newItemSubject,
                text:newItemText,
                day:props.day.date,
                month:props.day.month,
                year:props.day.year,
                done:false
            }
            setNewItemSubject('')
            setNewItemText('')
            setItem(data)
        }
        setNewItem(false)
        setItems(getItems());

    }


    const closeModal = () => {

        props.closeModal();
    }

    return (
        <>
            <div className="w-4/6 bg-white p-4 shadow-xl relative">
                <div onClick={closeModal} className="cursor-pointer w-16 h-16 bg-teal-300 rounded-full -mt-12  flex items-center justify-center absolute -right-8">
                    <i className="fa fa-close text-white text-2xl "></i>
                </div>
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
                            <div key={idx} className="border border-slate-300 rounded p-3 my-1 select-none flex items-center justify-between" >
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
                                <div className="flex items-between justify-center">
                                    {editedId !== item.id && (
                                        <>
                                            <div onClick={() => {deleteItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-trash text-red-500"></i>
                                            </div>
                                            <div onClick={() => {editItem(item)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-pencil text-blue-500"></i>
                                            </div>
                                        </>
                                    )}
                                    {editedId === item.id && (
                                        <>
                                            <div onClick={() => {saveEdited(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                                <i className="fa fa-check text-green-500"></i>
                                            </div>
                                        </>
                                    )}



                                </div>
                            </div>
                        )
                    })
                    }
                    {newItem && (
                        <div className="border border-slate-300 rounded p-3 my-1 select-none flex items-center justify-between" >
                            <div className="flex items-center w-full">

                                <div className="mx-2 w-full">
                                    <p className="font-medium">
                                        <input onChange={(e) => {setNewItemSubject(e.target.value)}} className=" p-1 border border-slate-300 outline-none w-full" type="text"/>

                                    </p>
                                    <div className="text-sm font-light">
                                       <textarea onChange={(e) => {setNewItemText(e.target.value)}} className="mt-1 border border-slate-300 w-full outline-none w-full">

                                       </textarea>

                                    </div>
                                </div>
                            </div>
                            <div className="flex items-between justify-center">
                                <div onClick={saveNewItem} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                    <i className="fa fa-check text-green-500"></i>
                                </div>

                            </div>
                        </div>
                    )}

                    {
                        items.length === 0 && (
                            <div className="border border-slate-300 rounded p-3 my-1 select-none flex items-center justify-center" >
                                <p>Нет записей</p>
                            </div>
                        )
                    }
                </div>


                <div onClick={addItem } className="cursor-pointer w-16 h-16 bg-teal-300 rounded-full -mb-12 mx-auto flex items-center justify-center">
                    <i className="fa fa-plus text-white text-2xl "></i>
                </div>
            </div>

        </>
    )
}
