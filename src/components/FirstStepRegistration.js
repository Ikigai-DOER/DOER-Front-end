import {Button, Divider, Form, Row, Switch} from "antd";
import React, {useState} from "react";
import {RegistrationState, Roles} from "../constants";

export const FirstStepRegistration = (props) => {
    const [role, setRole] = useState(Roles.DOER);

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            name='normal_login'
            onFinish={() => props.setStep(RegistrationState.UserInfo)}
        >
            <Form.Item name="role">
                <Row>
                    <h2>
                        I am a
                    </h2>
                </Row>
                <Row span={24} justify="center">
                    <div style={{fontSize: 90, textAlign: 'center', width: '100%'}}>
                        {role === Roles.DOER ? 'DOER' : 'EMPLOYER'}
                    </div>
                    <Switch onChange={() => {
                        setRole(!role);
                        props.setProfileType(!role);
                    }}/>
                </Row>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{width: '100%'}}>
                    Dalje
                </Button>

                <Divider>
                    Imate profil?
                </Divider>

                <Button type='default'
                        size='large'
                        style={{width: '100%'}}>
                    Uloguj se
                </Button>
            </Form.Item>
        </Form>
    )
}
