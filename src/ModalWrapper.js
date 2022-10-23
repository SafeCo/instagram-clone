import './ModalWrapper.css'

export default function ModalWrapper(props){
    return (
        <div className="modalWrapper__container">
            <div className="modalWrapper__darkBg" onClick={(e)=>  {
                if(e.currentTarget === e.target){
                    props.switch(e)
                    } 
                } 
            }
            >
            {props.children}
            </div>
        </div>
    )
}