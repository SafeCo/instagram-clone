useEffect(()=>{
    if(stopRepeat.current){
            stopRepeat.current = false;
            const name = String(username)
            db.collection("posts").where("username", "==", name)
            .get()
            .then((querySnapshot) => {
                console.log("exectued use effect")
                console.log(querySnapshot.docs)
                setMyPosts(querySnapshot.docs.map(doc => ({
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



    const postRows = row.map( (row, index) => {
        // first check if postlength is divisble by 3? if not check its nearest 3 multiplier and then
        //push the difference in 
        console.log(num)
        console.log(myPosts.length)
        console.log(num != myPosts.length)
        if (num != myPosts.length){
            const diff = num - myPosts.length
            const test = myPosts.slice(index * 3, index * 3 + 3)
            
            console.log(diff)

            for(let i = 0; i < diff; i++){
                test.push("placeholder")
            }
            return test

        }else{

            console.log(" if not activated")
            
            return myPosts.slice(index * 3, index * 3 + 3)
        }
    }
    );