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
                    setMyposts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        post: doc.data(),
                        }))
                    )
                    
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            }
		}, []);


    const getPosts = () =>{
        //This determines the number of rows
        const row = [...Array( Math.ceil(myPosts.length / 3) )]
        console.log(row)

        //
        const postRows = row.map( (row, index) => {
            if (myPosts.length < 3){
                const diff = 3 - myPosts.length
                const test = myPosts.slice(index * 3, index * 3 + 3)
                for(let i = 0; i < diff; i++){
                    test.push("placeholder")
                }
                return test
            }else{
                return myPosts.slice(index * 3, index * 3 + 3)
            }
        }
        );
        console.log(postRows)

        const content = postRows.map((row, index) => (
            <div className="pP__posts__row" key={index}>
                { row.map( (postInfo, index) => {
                        if(postInfo === "placeholder"){
                            return <div className="pP__post__container" >
                                        <div></div>
                                    </div>
                        }else{
                        return  <div className="pP__post__container" >
                                    <img  className="pP__post__image" src={postInfo.post.imageUrl}  />
                                </div>
                        }
                    }
                    
                )}
            </div> )
        );
        return (
            <>
            {content}
            </>
        );

    }



    return (
        <div className="pP__posts__container">
            <div className="pP__posts__collection">
            {
                getPosts()
            }
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