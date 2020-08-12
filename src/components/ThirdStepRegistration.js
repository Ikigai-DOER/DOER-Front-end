import {Button, Divider, Form, Input} from "antd";
import React, {useState} from "react";
import {RegistrationState, Roles} from "../constants";

export const ThirdStepRegistration = (props) => {
    const [password, setPassword] = useState('');

    const {profile} = props;

    const [form] = Form.useForm();

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            form={form}
            onFinish={(values) => {
                props.setProfile({
                    ...props.profile,
                    user: {
                        ...props.profile.user,
                        username: values.username,
                        password: values.password,
                    }
                });

                if (props.profileType === Roles.DOER) {
                    alert("DOER REGISTERED");
                } else {
                    alert("EMPLOYER REGISTERED");
                }
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
                    },
                    {
                        min: 8, message: 'Lozinka mora imati makar 8 karaktera.'
                    },
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
                    },
                    {
                        min: 8, message: 'Lozinka mora imati makar 8 karaktera.'
                    },
                    {
                        validator: (_, value) => {
                            if (value !== form.getFieldValue('password'))
                                return Promise.reject('Lozinke moraju biti istovetne.');
                            return Promise.resolve();
                        }
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

            </Form.Item>
            <Form.Item>
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
