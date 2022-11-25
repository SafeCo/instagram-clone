import React, {useState, useEffect} from 'react'
import { db } from '../../../firebase';



function CategoryPost({username, setPostNum}) {
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts]= useState([])

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

    useEffect(()=>{
        setPostNum(myPosts.length)
    },[myPosts])


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
        const tempArr = [...myPosts]

        for(let i = 0; i < diff; i++){
            tempArr.push("placeholder")
        }

        
        const postRows = row.map( (row, index) => {              
                return tempArr.slice(index * 3, index * 3 + 3)
        });

        const content = postRows.map((row, index) => (
            <section key={"row" + index}
            className="pP__posts__row" 
            >
                { row.map( (postInfo, index) => {
                        if(postInfo === "placeholder"){
                            return <article 
                                        key={"empty" + index}
                                        className="pP__post__container" >
                                        <div></div>
                                    </article>
                        }else{
                            return  <article
                                        key={"image" + index}
                                        className="pP__post__container" 
                                    >
                                        <img  className="pP__post__image" src={postInfo.post.imageUrl} alt="post" />
                                    </article>
                        }
                    }
                    
                )}
            </section> )
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
            <div className="pP__posts__collection" >
            {
                posts 
            }
            </div> 
        </div>
    )
}

export default CategoryPost