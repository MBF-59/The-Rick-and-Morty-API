import { XCircleIcon } from "@heroicons/react/24/outline"


function Modal({title,children,onclose,open}) {
  return (
    open &&
    <div>
        <div className="backdrop" onClick={()=>onclose(false)} ></div>
        <div className="modal" >
            <div className="modal__header">
                <h2 className="title">{title}</h2>
                <button onClick={()=>onclose(false)} >
                    <XCircleIcon className="icon close"/>
                </button>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal