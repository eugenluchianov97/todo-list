import React, {useContext, useEffect, useState} from "react";
import _month from "../../dictionares/month";
import _weekDaysFull from "../../dictionares/weekDaysFull";


import {itemsIndex, itemsStore, itemsUpdate, itemsDelete, itemsComplete, itemsTasks} from "../../api";


import AddItem from "./../AddItem/Component"
import ShowItem from "./../ShowItem/Component"
import EditItem from "./../EditItem/Component"

import ModalContext from "../../contexts/ModalContext";
import useAsyncEffect from "use-async-effect";
import TasksContext from "../../contexts/TasksContext";
import {Store} from "react-notifications-component";
interface DayItemProps {
    day:any
}


export default  (props:DayItemProps) => {

    const month:any = _month;
    const weekDaysFull:any = _weekDaysFull;

    const {modal, _setModal} = useContext<any>(ModalContext);
    const {tasks, _setTasks} = useContext<any>(TasksContext);

    const [items, setItems] = useState<any>([])
    const [editedId, setEditedId] = useState<any>(null)
    const [subject, setSubject] = useState<any>('')
    const [text, setText] = useState<any>('')

    const [newItem, setNewItem] = useState<any>(false)

    const [loading, setLoading] = useState(true)


    useAsyncEffect(async () => {
        setLoading(true)

        let res = await itemsIndex(props.day.date, props.day.month, props.day.year);
        if(res.status === 200){
            setItems(res.data.items);
        }

        setLoading(false)

    }, [props])

    const completeItem = async (id:number) => {
        setLoading(true)
        let result  = await itemsComplete(id);

        if(result.status === 200){
            Store.addNotification({
                title: "Выполненно!",
                message: "",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            let res = await itemsIndex(props.day.date, props.day.month, props.day.year);
            if(res.status === 200){
                setItems(res.data.items);
                setLoading(false)
            }
        }
    }

    const deleteItem = async  (id:number) => {
        setLoading(true)

        let result  = await itemsDelete(id);
        if(result.status === 200){
            Store.addNotification({
                title: "Успешно удалено!",
                message: "",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            let res = await itemsIndex(props.day.date, props.day.month, props.day.year);
            let result2 = await itemsTasks(props.day.month,props.day.year);


            if(result2.status === 200){
                _setTasks(result2.data.items);
            }
            if(res.status === 200){
                setItems(res.data.items);
                setLoading(false)
            }
        }
    }

    const addItem = () => {
        _setModal(<AddItem day={props.day} />)
    }

    const editItem = (item:any) => {
        _setModal(<EditItem item={item} day={props.day}/>)

    }

    const showItem = (item:any) => {
        _setModal(<ShowItem item={item} day={props.day}/>)
    }

    const back = () => {
        _setModal(false)
    }

    return (
        <>
            <div className="w-4/5 sm:w-4/6 bg-white shadow-xl relative">
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

                <div className="bg-teal-300 flex justify-between p-2">
                    <div className="text-white text-lg  font-semibold">{props.day.date} {month[props.day.month]}  {props.day.year}</div>
                    <div onClick={back} className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <i className="fa fa-close text-teal-300 text-2xl "></i>
                    </div>
                </div>


                <div className=" my-2 sm:my-2 h-full overflow-y-auto sm:h-96 mx-1 sm:mx-4" >
                    {loading && (
                        <div className=" text-slate-300 p-1 my-1 text-sm select-none flex items-center justify-center" >
                            <p>Loading...</p>
                        </div>
                    )}

                    {!loading && items.length > 0 && items.map((item:any, idx:number) => {
                        let className = "border border-slate-300 p-1 my-1 select-none flex items-center justify-between " + (item.done ? 'bg-green-200':'');
                        return (
                            <div key={idx} className={className} >
                               <div className="flex items-center w-full">
                                   <div className="w-full text-xs">
                                       {++idx}.{item.subject}
                                   </div>
                               </div>
                                <div className="flex flex-col sm:flex-row items-between justify-center ">
                                    <>
                                        <div onClick={() => {deleteItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                            <i className="fa fa-trash text-red-500"></i>
                                        </div>
                                        <div onClick={() => {editItem(item)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                            <i className="fa fa-pencil text-blue-500"></i>
                                        </div>
                                        <div onClick={() => {showItem(item)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                            <i className="fa fa-eye text-slate-600"></i>
                                        </div>
                                        <div onClick={() => {completeItem(item.id)}} className=" mx-1 cursor-pointer flex items-center justify-center w-9 h-9 bg-slate-200 rounded-full p-4">
                                            <i className={"fa fa-star " + (item.done ? 'text-yellow-500' : 'text-slate-600')}></i>
                                        </div>
                                    </>
                                </div>
                            </div>
                        )
                    })}

                    {items.length === 0 && !loading && (
                            <div className="border border-slate-300 rounded p-2 my-1 text-xs select-none flex items-center justify-center" >
                                <p>Нет записей</p>
                            </div>
                        )}

                </div>


                <div onClick={addItem } className="cursor-pointer w-8 h-8 bg-teal-300 rounded-full -mb-4 mx-auto flex items-center justify-center">
                    <i className="fa fa-plus text-white text-2xl "></i>
                </div>
            </div>

        </>
    )
}
