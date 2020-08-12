import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router";
import {Row, Col, Form, Input, Button, message, Divider, Layout} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const {Content} = Layout;
function LoginForm() {
    let history = useHistory();

    const handleOnFinish = value => {};

    const handleValidatePassword = (rule, value) => {
        if(value && value.length <= 8)
            return Promise.reject('Ovo polje mora imati vise od 8 karaktera.');
        return Promise.resolve();
    }

    return <Layout>
        <Content style={{height: '100vh'}} className='content-background'>
            <div className='login'>
                <Row>
                    <Col span={24}>
                        {/*<img src={""} style={{width: '100%'}} alt='conmisi logo'/>*/}
                        <Form
                            style={{marginTop: '1em'}}
                            size='large'
                            name="normal_login"
                            onFinish={handleOnFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true, message: "Ovo polje ne sme biti prazno",
                                    },
                                    {
                                        type: "email",
                                        message: 'Unesite ispravan email.'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined/>}
                                    placeholder="Korisnicko ime"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        validator: handleValidatePassword,
                                    }
                                ]}
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
                                        style={{width: '100%'}}>
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
