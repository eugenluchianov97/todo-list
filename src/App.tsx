import React, {useState} from 'react';
import './App.css';


import Calendar from "./components/Calendar/Component"
import Modal from "./components/Modal/Component"




function App() {

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
