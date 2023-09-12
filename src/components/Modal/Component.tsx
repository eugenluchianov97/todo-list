import React, {FC} from "react";

// @ts-ignore
interface ModalProps {
    closeModal: () => void,
    modal:boolean,
    component:React.ReactNode

}
export default (props:ModalProps) => {

    const closeModal = (e:any) => {
        e.preventDefault();

        if (e.target === e.currentTarget) {
            props.closeModal()
        }
    }

    let className = "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center " + (props.modal ? "block ease-out duration-300" : "hidden ease-out duration-300");
    return (
        <div className={className}>
            {
                props.component
            }

        </div>
    )
}

