import React, {FC} from "react";

interface ModalProps {
    modal:React.ReactNode|boolean

}
export default (props:ModalProps) => {


    let className = "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center " + (props.modal ? "block ease-out duration-300" : "hidden ease-out duration-300");
    return (
        <div className={className}>
            {
                props.modal
            }

        </div>
    )
}

