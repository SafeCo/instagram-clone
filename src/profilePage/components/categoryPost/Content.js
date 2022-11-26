import React,{useState} from 'react'
import ViewComments from '../../../homePage/components/posts/viewComments/ViewComments';
import ModalWrapper from '../../../globalComponents/modalWrapper/ModalWrapper';
import {useOutletContext } from 'react-router-dom'

function Content({postInfo, index}) {

    const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)
    const {user} = useOutletContext()
    
    const modalSwitchOpen = (e)=>{
        setModalChild(
            <ViewComments 
            user={user}
            postPhotoUrl={user.photoURL}
            caption={postInfo.post.caption}
            postId={postInfo.id}
            username={postInfo.post.username}
            imageUrl={postInfo.post.imageUrl}  
            />
        )
		setModalOpen(!modalOpen)
	}


    return (
        <>
            {modalOpen && 
                <ModalWrapper modalState={modalOpen} modalSwitch={modalSwitchOpen}>
                    {modalChild}
                </ModalWrapper>
            }
            <article
                key={"image" + index}
                className="cP__post__container"
                onClick={(e)=>{
                    modalSwitchOpen(e)
                    }} 
            >
                <img  className="cP__post__image" src={postInfo.post.imageUrl} alt="post" />
            </article>
        </>
        

    )
}

export default Content
