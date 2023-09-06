import React, {useState} from 'react';
import './App.css';


import Calendar from "./components/Calendar/Component"
import Modal from "./components/Modal/Component"

function App() {

    const [modal,setOpenModal] = useState(false)
    const [component,setComponent] = useState(null)

    const closeModal = ():void => {
        console.log('here')
        setOpenModal(false)
    }

    const openModal = (component:any):void => {
        setComponent(component)
        setOpenModal(true)
    }
    return (
        <>
            <Calendar openModal={openModal} modal={modal}/>
            <Modal closeModal={closeModal} modal={modal} component={component}/>
        </>
    );
}

export default App;
