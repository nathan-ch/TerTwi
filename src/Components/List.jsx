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

const PostsListMaker = ( {data}) =>{
    return (
      <div>
        {data.map( post =>
          <Card className="m-4">
            <Card.Header><LikeOutlined /> {post.like}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {' '}
                  {post.text}{' '}
                </p>
                <footer className="blockquote-footer">
                <Link to={`/user/${post.authorId}`}>{post.author}</Link>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        )}
      </div>
    )
}
export default PostsListMaker
