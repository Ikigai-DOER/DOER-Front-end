import {Button, Col, Form, Input, Layout, Row} from "antd";
import {Icon} from "@iconify/react";
import userOutlined from "@iconify/icons-ant-design/user-outlined";
import lockTwoTone from "@iconify/icons-ant-design/lock-twotone";
import React from "react";

const {Header, Footer, Content} = Layout;

function LoginForm(props) {
    return (<Row className="login-form" align="middle" style={{marginTop: props.isMobile ? 0 : "10%"}}>
            <Col offset={props.isMobile ? 0 : 8} span={props.isMobile ? 24 : 8}>
                <Layout className="login-layout">
                    <Header>LOGO</Header>
                    <Content className="content">
                        <Form>
                            <Form.Item name="username">
                                <Input
                                    placeholder="Unesite korisničko ime"
                                    prefix={<Icon icon={userOutlined}/>}
                                />
                            </Form.Item>
                            <Form.Item name="password">
                                <Input.Password
                                    placeholder="Lozinka"
                                    prefix={<Icon icon={lockTwoTone}/>}
                                />
                            </Form.Item>
                        </Form>
                    </Content>
                    <Footer>
                        <Row justify="center">
                            {props.changeOrder ?
                                <>
                                    <Col span="10">
                                        <Row>
                                            <span>Nemate profil?</span>
                                            <span onClick={() => props.goToRegister(true)}>Registrujte se!</span>
                                        </Row>
                                    </Col>
                                    <Col span="3">
                                        <Button type="primary" size="large">Uloguj
                                            se</Button>
                                    </Col>
                                </> :
                                <>
                                    <Row>
                                        <Col span="5">
                                            <Button type="primary" size="large">Uloguj se</Button>
                                        </Col>
                                    </Row>
                                    <Row justify="center">
                                            <Row>
                                                <span>Nemate profil?&nbsp;</span>
                                                <span onClick={() => props.goToRegister(true)}>Registrujte se!</span>
                                            </Row>
                                    </Row>
                                </>
                            }
                        </Row>
                    </Footer>
                </Layout>
            </Col>
        </Row>
    );
}

export default LoginForm;