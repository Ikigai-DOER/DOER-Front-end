import {Card, Button, Divider, Form, Col, Row, Switch} from "antd";
import React, {useState} from "react";
import {RegistrationState, Roles} from "../constants";
import {useHistory} from "react-router";

export const FirstStepRegistration = (props) => {
    const history = useHistory();

    const gridStyle = {
        width: '50%',
        textAlign: 'center',
        border: '1px solid #e8e5ec'
    };

    const cardStyle = {
        minWidth: '500px',
        textAlign: 'center',
        border: 0
    }

    const selectedGridStyle = {
        backgroundColor: '#40A9FF',
        color: 'white',
        width: '50%',
        textAlign: 'center',
        border: '1px solid #e8e5ec'
    }

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            onFinish={() => props.setStep(RegistrationState.UserInfo)}
        >
            <Form.Item>
                <Row justify="center">
                    <Form.Item>
                        <Row>
                            <Col>
                                <Card title="Odaberite ulogu" style={cardStyle}>
                                    <Card.Grid hoverable={true} onClick={() => props.setRole(Roles.DOER)}
                                               style={props.role === Roles.DOER ? selectedGridStyle : gridStyle}>
                                        DOER
                                    </Card.Grid>
                                    <Card.Grid hoverable={true} onClick={() => props.setRole(Roles.EMPLOYER)}
                                               style={props.role === Roles.EMPLOYER ? selectedGridStyle : gridStyle}>
                                        POSLODAVAC
                                    </Card.Grid>
                                </Card>
                            </Col>
                        </Row>
                    </Form.Item>
                </Row>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{width: '100%'}}>
                    {'Dalje >'}
                </Button>
            </Form.Item>

            <Divider>
                Imate profil?
            </Divider>

            <Form.Item>
                <Button type='default'
                        size='large'
                        style={{width: '100%'}}
                        onClick={() => props.goToRegister(false)}
                >
                    Ulogujte se
                </Button>
            </Form.Item>
        </Form>
    )
}
