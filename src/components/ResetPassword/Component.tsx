import React, {useContext, useState} from "react";


import NewPassword from "./../NewPassword/Component"


import {passwordReset} from "../../api"

import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";
import {Store} from "react-notifications-component";


export default () => {

    const {user, _setUser} = useContext<any>(UserContext);
    const {modal, _setModal} = useContext<any>(ModalContext);

    const [email, setEmail] = useState<any>('');
    const [emailEr, setEmailEr] = useState<any>([]);

    const [loading, setLoading] = useState(false);



    const resetPassword = async () => {
        setLoading(true)

        const data = {
            email:email,
        }
         let result = await passwordReset(data)

        if(result.status === 200){
            Store.addNotification({
                title: "Код был выслан на указанную почту!",
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
            _setModal(<NewPassword/>)
        }

        if(result.response && result.response.status === 422){
            Object.entries(result.response.data.errors).map((er :any) => {
                if(er[0] === 'email') {
                    setEmailEr(er[1])
                }
            })
        }

        setLoading(false)

    }

    const emailClass = "text-xs my-1 outline-none border  rounded-sm p-2 w-full " + (emailEr.length > 0  ? "border-red-300" : "border-slate-300")

    return (

        <>
            <div className="w-4/5 sm:w-1/2  lg:w-1/4 bg-white p-1 sm:p-4 shadow-xl relative">
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

                <div className="p-3">
                    <p className="font-semibold mb-1 text-xs" >Восстановить пароль</p>
                    <input value={email} onChange={(e) => {setEmail(e.target.value);}} className={emailClass} type="email" placeholder="Email"/>
                    {emailEr.length > 0 && (
                        <p className="text-xs text-red-300">{emailEr[0]}</p>

                    )}

                    <button onClick={resetPassword} className="text-xs my-1 outline-none border bg-slate-700 text-white rounded-sm p-2 w-full">Выслать код</button>
                </div>

            </div>

        </>
    )
}
