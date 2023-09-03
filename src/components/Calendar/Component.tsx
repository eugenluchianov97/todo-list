import "./style.css"


export default () => {
    return (
        <div className="flex calendar-container flex-col items-center">
            <div className="flex w-full bg-white">
                <div>
                    <div>
                        12
                    </div>
                    jan 2023
                </div>

                <div>
                    Tuesday
                </div>

            </div>

            <div className="cursor-pointer -my-8 bg-emerald-500  w-16 h-16 rounded-full flex items-center justify-center hover:bg-emerald-400 ease-in-out duration-300">
                <i className="text-white font-medium fa fa-plus"></i>
            </div>



        </div>
    )
}