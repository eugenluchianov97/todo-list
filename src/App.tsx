import React, {useEffect, useState} from 'react';
import './App.css';


import Calendar from "./components/Calendar/Component"
import Modal from "./components/Modal/Component"
import Login from "./components/Login/Component"

import axios from "axios";




function App() {
    let token  = "1|AGOsBpXazAHf956rNnv9SpkPcYKmisL082rzdKE0f816ff2d";

    const config = {
        headers:{
            "Authorization": "Bearer " + token,
            "Accept":"application/json"
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('TOKEN');
        if(token){

        }
        else{
            openModal(<Login openModal={openModal}/>);
        }
        // axios.get('http://localhost:8000/api/me', config).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // });
    },[])


    const [modal,setOpenModal] = useState<boolean>(false)
    const [component,setComponent] = useState<React.ReactNode|null>(null)

    const closeModal = ():void => {

        setOpenModal(false)
    }

    const openModal = (component:React.ReactNode):void => {
        setComponent(component)
        setOpenModal(true)
    }

    return (

        <>
            <Calendar openModal={openModal} closeModal={closeModal} modal={modal}/>
            <Modal closeModal={closeModal} modal={modal} component={component}/>
        </>
    );
}

export default App;
