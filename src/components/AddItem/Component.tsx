import React, {useState} from "react";
import {itemsStore} from "../../api";

interface dataObj {
    props:any,
    close:() => void

}
export default (props:dataObj) => {

    const [newItemSubjectEr,setNewItemSubjectEr] = useState([]);
    const [newItemSubject, setNewItemSubject] = useState<any>('')
    const [newItemText, setNewItemText] = useState<any>('')

    console.log(props)
    const saveNewItem = () => {
        console.log('heree ----')
        let data = {
            subject:newItemSubject,
            text:newItemText,
            date:props.props.date,
            month:props.props.month,
            year:props.props.year,
            timestamp:new Date(props.props.year,props.props.month,props.props.date).getTime(),
            done:false
        }

        itemsStore(data).then((res:any) => {
            if(res.status === 200){
                 props.close()
            }

        }).catch((err) => {
            if(err.response && err.response.status === 422){
                Object.entries(err.response.data.errors).map((el:any) => {
                    console.log(el[0] === 'subject')
                    if(el[0] === 'subject'){
                        setNewItemSubjectEr(el[1])
                    }
                })
            }
        })

    }

    return (
        <div className="border border-slate-300 rounded p-1 sm:p-3 my-1 select-none flex items-center justify-between" >
            <div className="flex items-center w-full">

                <div className="mx-2 w-full">
                    <p className="font-medium flex flex-col">
                        <input onChange={(e) => {setNewItemSubject(e.target.value);setNewItemSubjectEr([])}} className={(newItemSubjectEr.length > 0 ? "border-red-300 " : "border-slate-300") + " p-1 border  outline-none w-full" } type="text"/>
                        <span className="text-red-300">{newItemSubjectEr[0]}</span>
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
    )
}
