import React, {Component} from 'react'
import {Alert, Button, Card, Form, Input, Typography} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'

import * as logoSE from '../../static/se-logo.png'
import './Login.css'

import {globalStore} from '../../state/stateProvider'
import {authenticate} from '../../state/actions'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMessage: null
        }
        this.handleFinish = this.handleFinish.bind(this);
    }

    setAlertMessage(msg) {
        if (msg == null) {
            this.setState({alertMessage: null});
        } else {
            this.setState({
                alertMessage: <Alert message={msg} type='error' showIcon className='login-alert'/>
            });
        }
    }

    login(username, password) {
        globalStore.dispatch(authenticate(username, password, () => {
            this.props.history.push('/app');
        }, (error) => {
            if (error.response != null && error.response.status === 401) {
                this.setAlertMessage('Invalid login. (Passwords are case sensitive.)');
            } else {
                this.setAlertMessage('Unknown error.');
            }
        }));
    }

    handleFinish(values) {
        this.setAlertMessage(null);
        this.login(values.username, values.password);
    }

    render() {
        const {Title} = Typography;

        let alertComponent = null;
        if (this.state.alertMessage != null) {
            alertComponent = <div>{this.state.alertMessage}</div>;
        }

        return (
            <div className='login-page'>
                <Card className='login-card'>
                    <div className='login-logo'><img src={logoSE} alt='SE Logo' className='login-logo'/></div>
                    <Title level={3} className='login-title'>Login</Title>
                    {alertComponent}
                    <Form onFinish={this.handleFinish}>
                        <Form.Item name='username' rules={[{required: true, message: 'Please input your username!'}]}
                                   validateTrigger={false}>
                            <Input prefix={<UserOutlined className='login-icon'/>} placeholder='Username'/>
                        </Form.Item>
                        <Form.Item name='password' rules={[{required: true, message: 'Please input your password!'}]}
                                   validateTrigger={false}>
                            <Input.Password prefix={<LockOutlined className='login-icon'/>} placeholder='Password'/>
                        </Form.Item>
                        <Form.Item>
                            <div className='login-btns'>
                                <Button type='primary' htmlType='submit' className='btn'>Login</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Login;
