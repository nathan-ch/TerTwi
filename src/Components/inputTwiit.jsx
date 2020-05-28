import React from 'react';
import { loginUser, sendNewPost } from '../_Redux/Actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button } from 'antd';
import { Card } from 'react-bootstrap';


const InputTwiit = () => {

  const userId = useSelector(state => state.authReducer.userId)
  const userToken = useSelector(state => state.authReducer.userToken)
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  
  const onFinish = values => {
    dispatch(sendNewPost(userId, values.twiit, userToken))
    form.resetFields()
  };

  return (
    <div>
      <Card className="m-4">
        <Card.Header>Share a new idea</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Form onFinish={onFinish} form={form}>
              <Form.Item name={'twiit'} >
                <Input.TextArea initialValues="type here ..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                Envoyer
                </Button>
              </Form.Item>
            </Form>
          </blockquote>
        </Card.Body>
      </Card>
  </div>
    
  )
};

export default InputTwiit