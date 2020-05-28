import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import PostsListMaker from '../Components/List';


const Profile = () => {
    const [postsList, setPostsList] = useState([]);
    const [userId, setUserId] = useState(null)

    const userToken = useSelector(state => state.authReducer.userToken)

    let { id } = useParams()

    useEffect(() => {
        setUserId(id)
        fetchUserPosts(createPostsList)
      },[]);

      useEffect(() => {
      },[postsList]);

    const fetchUserPosts = (callback) =>{
        const URL = `https://api-minireseausocial.mathis-dyk.fr/posts?user.id=${userId}`;
        fetch(URL,{
            method : 'GET',
            headers : {
                'Authorization': `Bearer ${userToken}`, 
                'Content-Type': 'application/json'
              },
        })
            .then((res) => res.json())
            .then(callback)
            .catch((error) => console.error(error))
    }

    const createPostsList = (posts) => {
        console.log("ça créé la liste");
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
        setPostsList(array.reverse())
      }

    return (
        <Container>
            <h1 className="text-center">Le profil de</h1>
            <PostsListMaker data={postsList} />
        </Container>

    )  
} 

export default Profile