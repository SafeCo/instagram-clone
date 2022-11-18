import React, {useState, useEffect, useRef} from 'react'
import { db } from '../../../firebase';
import ViewComments from '../../../homePage/components/posts/viewComments/ViewComments';



function CategoryPost({username}) {
    const [posts, setPosts] = useState([]);
    const stopRepeat = useRef(true)
    const [myPosts, setMyPosts]= useState([])

    //THE DATA DOESNT LOAD BECAUSE OF WHERE
    // THE USEEFFECT GETS USERNAME AS UNDEFINED
    // MADE THE USE EFFECT DEPENDENT ON USERNAME CHANGING WHICH IS A TEMPORARY FIX

    useEffect(()=>{
                const name = String(username)
                db.collection("posts")
                .where("username", "==", name)
                .get()
                .then((querySnapshot) => {
                    setMyPosts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        post: doc.data(),
                        }))
                    )
                })
                
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
    
    
        }, [username]);

        // useEffect(()=>{
        //     console.log("getPosts useffect")
        //         setPosts(getPosts());
        //     }, [myPosts]);

        


    const getPosts = () =>{
        //This determines the number of rows
        const row = [...Array( Math.ceil(myPosts.length / 3) )]

        const checkNum =  (n)=>{
            if(n > 0)
        return Math.ceil(n/3.0) * 3;
            else if( n < 0)
                return Math.floor(n/3.0) * 3;
            else
        return 3;
        }

        const num = checkNum(myPosts.length)

        const diff = num - myPosts.length
        const tempArr = [... myPosts]
        

        for(let i = 0; i < diff; i++){
            tempArr.push("placeholder")
        }

        
        const postRows = row.map( (row, index) => {
            // first check if postlength is divisble by 3? if not check its nearest 3 multiplier and then
            //push the difference in                 
                return tempArr.slice(index * 3, index * 3 + 3)
        });

        const content = postRows.map((row, index) => (
            <div className="pP__posts__row" key={index}>
                { row.map( (postInfo, index) => {
                        if(postInfo === "placeholder"){
                            return <div 
                                        key={index}
                                        className="pP__post__container" >
                                        <div></div>
                                    </div>
                        }else{
                            return  <div
                                        key={postInfo.post.id}
                                        className="pP__post__container" 
                                    >
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

    useEffect(()=>{
        setPosts(getPosts())
    },[myPosts])

   

    return (
        <div className="pP__posts__container">
            <div className="pP__posts__collection">
            {
               myPosts ?  posts : (<div>Not Loaded</div>)
            }
            </div>
                        
        </div>
    )
}

export default CategoryPost