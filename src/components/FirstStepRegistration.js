import {Card, Button, Divider, Form, Col, Row, Switch} from "antd";
import React, {useState} from "react";
import {RegistrationState, Roles} from "../constants";

export const FirstStepRegistration = (props) => {
    const [role, setRole] = useState(Roles.DOER);

    const gridStyle = {
        width: '50%',
        textAlign: 'center',
    };

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            onFinish={() => props.setStep(RegistrationState.UserInfo)}
        >
            <Form.Item>
                <Row justify="center">
                    {/*<div style={{fontSize: 90, textAlign: 'center', width: '100%'}}>*/}
                    {/*    {role === Roles.DOER ? 'DOER' : 'EMPLOYER'}*/}
                    {/*</div>*/}
                    {/*<Form.Item name="role"*/}
                    {/*    valuePropName='checked'*/}
                    {/*>*/}
                    {/*    <Switch onChange={() => {*/}
                    {/*        setRole(!role);*/}
                    {/*        props.setProfileType(!role);*/}
                    {/*    }}/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item>
                        <Row>
                            <Col>
                                <Card title="Ja sam" style={{minWidth: '500px', textAlign: 'center'}}>
                                    <Card.Grid hoverable={true} style={gridStyle}>
                                        DOER
                                    </Card.Grid>
                                    <Card.Grid hoverable={true} style={{width: '50%'}}>
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
                    Dalje
                </Button>
            </Form.Item>

            <Divider>
                Imate profil?
            </Divider>

            <Form.Item>
                <Button type='default'
                        size='large'
                        style={{width: '100%'}}>
                    Uloguj se
                </Button>
            </Form.Item>
        </Form>
    )
}
