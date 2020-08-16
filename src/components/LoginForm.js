import React from 'react'
import {useHistory} from "react-router";
import {Button, Col, Divider, Form, Input, Layout, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import logo from "../logo/doer2.svg"
import api from "../api";

const {Content} = Layout;

function LoginForm(props) {
    let history = useHistory();

    const handleOnFinish = values => {
        const loginData = {
            username: values.username,
            password: values.password
        };

        api.login(loginData)
            .then(() => history.push('/site/job'));
    };

    return <Layout>
        <Content style={{height: '100vh'}} className='content-background'>
            <div className='login'>
                <Row>
                    <Col span={24}>
                        <img src={logo} style={{width: '100%'}} alt='conmisi logo'/>
                        <Form
                            style={{marginTop: '1em'}}
                            size='large'
                            name="normal_login"
                            onFinish={handleOnFinish}
                        >
                            <Form.Item
                                name="username"
                            >
                                <Input
                                    prefix={<UserOutlined/>}
                                    placeholder="Korisnicko ime"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                            >
                                <Input.Password
                                    prefix={<LockOutlined/>}
                                    type="password"
                                    placeholder="Lozinka"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size='large' style={{width: '100%'}}>
                                    Ulogujte se
                                </Button>

                                <Divider>
                                    Nemate profil?
                                </Divider>

                                <Button type='default'
                                        size='large'
                                        style={{width: '100%'}}
                                        onClick={() => props.goToRegister(true)}
                                >
                                    Registrujte se
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
}

export default LoginForm;
