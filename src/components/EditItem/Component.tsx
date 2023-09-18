import AddItem from "../AddItem/Component";
import React, {useContext, useState} from "react";
import ModalContext from "../../contexts/ModalContext";
import DayItem from "../DayItem/Component";
import _month from "../../dictionares/month";
import {itemsIndex, itemsUpdate} from "../../api";

interface ShowItemProps {
    item:any,
    day:any
}
export default (props:ShowItemProps) => {
    const {modal, _setModal} = useContext<any>(ModalContext);

    const month:any = _month;

    const [subject, setSubject] = useState(props.item.subject)
    const [subjectEr, setSubjectEr] = useState([])
    const [text, setText] = useState(props.item.text)
    const [loading, setLoading] = useState(false)
    const back = () => {
        _setModal(<DayItem day={props.day} />)
    }

    const update = async () => {
        setLoading(true);
        let data = {
            subject:subject,
            text:text,
            date:props.day.date,
            month:props.day.month,
            year:props.day.year,
            timestamp:new Date(props.day.year,props.day.month,props.day.date).getTime(),
            done:false
        }

        let result = await itemsUpdate(props.item.id,data)

        if(result.status === 200){
             setLoading(false);
            _setModal(<DayItem day={props.day} />)
        }

        if(result.response && result.response.status === 422){
            Object.entries(result.response.data.errors).map((er :any) => {
                if(er[0] === 'subject') {
                    setSubjectEr(er[1])
                }
            })

            setLoading(false);
        }

    }
    return (
        <>
            <div className="w-4/5 sm:w-4/6 bg-white shadow-xl relative ">
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
                        <i className="fa fa-arrow-left text-teal-300 text-2xl "></i>
                    </div>
                </div>
                <div className="text-xs text-slate-600 p-2">
                    <p className="font-semibold mb-1">Заголовок</p>
                    <input placeholder="Заголовок..." className={"w-full p-2 border  outline-none " + (subjectEr.length > 0 ? "border-red-300" : "border-slate-300")} value={subject}  onChange={(e) => {setSubject(e.target.value)}}/>
                    {setSubjectEr.length > 0 && (
                        <p className="mt-1 text-red-300">{subjectEr}</p>
                    )}
                </div>
                <div className="text-xs text-slate-600 p-2">
                    <p className="font-semibold mb-1">Описание задачи</p>
                    <textarea placeholder="Описание..." rows={10} className="w-full p-2 border border-slate-300 outline-none" defaultValue={text} onChange={(e) => {setText(e.target.value)}}></textarea>
                </div>

                <div className="text-xs p-2">
                    <button onClick={update} className="my-1 outline-none border bg-teal-300 text-white rounded-sm p-2 w-full">Сохранить</button>
                </div>
            </div>
        </>
    )
}
