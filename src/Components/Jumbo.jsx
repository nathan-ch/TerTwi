import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap'
const Jumbo = () => (
        <Jumbotron fluid>
            <Container>
                <h1 className="text-primary">Welcome on TerTwii</h1>
                <p>
                This website is a training to Redux and React. We use auth and routing to create a small social media website.
                </p>
            </Container>
        </Jumbotron>
)  

export default Jumbo