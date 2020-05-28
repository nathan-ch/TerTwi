import React, { useState, useEffect } from 'react';
import Jumbo from '../Components/Jumbo';
import PostsListMaker from '../Components/List';

const Home = () => {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        fetchBlocs(createPostsList)
      },[]);

      useEffect(() => {
      },[postsList]);

    const fetchBlocs = (callback) =>{
        const URL = `https://api-minireseausocial.mathis-dyk.fr/posts`;
        fetch(URL)
            .then((res) => res.json())
            .then(callback)
            .catch((error) => console.error(error))
    }

    const createPostsList = (posts) => {
        let array =[]
          for (let i = 0; i < posts.length; i++) {
            let post = posts[i]
            let data = {}
            if(post.text == null){
                data["text"] = "Hello World"
            }else data["text"] = post.text
            if(post.like == null){
                data["like"] = 0
            }else data["like"] = post.like
            if(post.user == null){
                data["author"] = "Eliot Anderson"
                data["authorId"] = "0"
            }else{
                data["author"] = post.user.username
                data["authorId"] = post.user.id 
            }
            array.push(data)
          }
        setPostsList(array)
      }
    return (
        <>
            <Jumbo />
            <PostsListMaker data={postsList}/>
        </>
    )  
}

export default Home