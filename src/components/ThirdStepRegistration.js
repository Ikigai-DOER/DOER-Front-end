import {Button, Col, Divider, Form, Input} from "antd";
import React, {useState} from "react";
import {RegistrationState, Roles} from "../constants";
import {useHistory} from "react-router";

export const ThirdStepRegistration = (props) => {
    const history = useHistory();

    const [password, setPassword] = useState('');

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            name="normal_login"
            onFinish={(values) => {
                if (values.password !== values.passwordRep) {
                    alert('Upisite isti password');
                    return;
                }

                props.setProfile({
                    ...props.profile,
                    user: {
                        ...props.profile.user,
                        username: values.username,
                        password: values.password,
                    }
                });

                if (props.profileType === Roles.DOER) {
                    // alert("DOER REGISTERED");
                    history.push('/site/job');
                } else {
                    // alert("EMPLOYER REGISTERED");
                    history.push('/site/job');
                }

                console.log(props.profile);
            }}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true, message: "Ovo polje ne sme biti prazno",
                    },
                    {
                        type: "string",
                        message: 'Unesite korisnicko ime.'
                    }
                ]}
            >
                <Input
                    placeholder="Korisnicko ime"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true, message: 'Ovo polje mora biti ispunjeno.'
                    }
                ]}
            >
                <Input.Password
                    type="password"
                    placeholder="Lozinka"
                />
            </Form.Item>

            <Form.Item
                name="passwordRep"
                rules={[
                    {
                        required: true, message: 'Ovo polje mora biti ispunjeno.'
                    }
                ]}
            >
                <Input.Password
                    type="password"
                    placeholder="Potvrdite lozinku"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{width: '100%'}}>
                    Dalje
                </Button>

                <Divider/>

                <Button type='default'
                        size='large'
                        style={{width: '100%'}}
                        onClick={() => props.setStep(RegistrationState.UserInfo)}>
                    Nazad
                </Button>
            </Form.Item>
        </Form>
    )
}
