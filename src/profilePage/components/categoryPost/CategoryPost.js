import React, {useState, useEffect, useRef} from 'react'
import { db } from '../../../firebase';


import testImage from './diamond.png'

function CategoryPost({username}) {
    const [posts, setPosts] = useState([]);
    const stopRepeat = useRef(true)
    const [myPosts, setMyposts]= useState([])

    useEffect(()=>{
		if(stopRepeat.current){
				stopRepeat.current = false;
                const name = String(username)
				db.collection("posts").where("username", "==", name)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            }
		}, []);

    // useEffect(()=>{
    //         db.collection("usernames").doc()
    // },[])

    return (
        <div className="pP__posts__container">
            <div className="pP__posts__collection">
                <div className="pP__posts__row" >
                    <div className="pP__post__container" >
                            <img  className="pP__post__image" src={testImage}  />
                    </div>
                    <div className="pP__post__container" >
                            <img  className="pP__post__image" src={testImage}  />
                    </div>
                    <div className="pP__post__container" >
                            <img  className="pP__post__image" src={testImage}  />
                    </div>
                </div>
                <div className="pP__posts__row" >
                    <div className="pP__post__container" >
                        <div className="pP__post">Square</div>
                    </div>
                    <div className="pP__post__container" >
                        <div className="pP__post">Square</div>
                    </div>
                    <div className="pP__post__container" >
                        <div className="pP__post">Square</div>
                    </div>
                    

                </div>

            </div>
                        
        </div>
    )
}

export default CategoryPost