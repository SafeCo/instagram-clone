useEffect(()=>{
    if(stopRepeat.current){
            stopRepeat.current = false;
            const name = String(username)
            db.collection("posts").where("username", "==", name)
            .get()
            .then((querySnapshot) => {
                console.log("exectued use effect")
                setMyposts(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data(),
                    }))
                )
            })
            
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            console.log("exectued use effect")

        }

    }, []);