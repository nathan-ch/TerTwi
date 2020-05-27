import React, { useState } from 'react';
import { loginUser, logoutUser } from '../_Redux/Actions'
import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = (props) => {
 const [user, setUser] = useState({username:'', password:'', submitted:false})

  const authReducer = useSelector(state => state.authReducer)
  console.log(authReducer.isAuthenticated);
  const dispatchLogin = useDispatch(loginUser())
  const dispatchlogout = useDispatch(logoutUser())


  const onFinish = values => {
    console.log('Received values of form: ', values);
    const creds = {username:values.username, password: values.password }
    dispatchLogin(creds)
  };

  return (
    <div style={{maxWidth:"300px", margin:"auto", marginTop:"10%"}}>
        <h1>Connexion</h1>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login