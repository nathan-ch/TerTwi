import React from 'react';
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
                  {post.author}<cite title="Source Title"></cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        )}
      </div>
    )
}
export default PostsListMaker
