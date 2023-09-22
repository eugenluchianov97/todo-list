import AddItem from "../AddItem/Component";
import React, {useContext} from "react";
import ModalContext from "../../contexts/ModalContext";
import DayItem from "../DayItem/Component";
import _month from "../../dictionares/month";

interface ShowItemProps {
    item:any,
    day:any
}
export default (props:ShowItemProps) => {
    const {modal, _setModal} = useContext<any>(ModalContext);
    const month:any = _month;
    const back = () => {
        _setModal(<DayItem day={props.day} />)
    }
    return (
        <>
            <div className="w-4/5 sm:w-4/6 bg-white relative shadow-xl shadow-slate-300">

                <div className="bg-slate-700 flex justify-end p-2">
                    <div onClick={back} className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <i className="fa fa-close text-slate-700 text-2xl "></i>
                    </div>
                </div>
                <div className="text-xs text-slate-600 p-2">
                    <p className="font-semibold mb-1">Заголовок</p>
                    <input placeholder="Заголовок..." className="w-full p-2 border border-slate-300 outline-none" value={props.item.subject} />
                </div>
                <div className="text-xs text-slate-600 p-2">
                    <p className="font-semibold mb-1">Описание задачи</p>
                    <textarea placeholder="Описание..." readOnly rows={10} className="w-full p-2 border border-slate-300 outline-none">{props.item.text}</textarea>
                </div>
                <div className="text-xs text-slate-600 p-2">
                    <p className="font-semibold mb-1">Дата и Время</p>
                    <div className="flex">
                        <div className="flex flex-col w-1/2">
                            <input type="date" value={props.item.date}  className={"w-full p-2 border  outline-none mr-1 border-slate-300"}/>

                        </div>
                        <div className="flex flex-col w-1/2">
                            <input type="time" value={props.item.time} className={"w-full p-2 border  outline-none ml-1 "}/>

                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}
