import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Card } from 'react-bootstrap';
import { LikeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'


const PostsListMaker = ( {data}) =>{

  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)

    return (
      <div>
        {data.map( post =>
          <Card className="m-4">
            { isAuthenticated && <Card.Header><LikeOutlined /> {post.like} </Card.Header> }
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}{post.text}{' '}
                </p>
                <footer className="blockquote-footer">
                  { isAuthenticated && <Link to={`/user/${post.authorId}`}>{post.author}</Link> }
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        )}
      </div>
    )
}
export default PostsListMaker
