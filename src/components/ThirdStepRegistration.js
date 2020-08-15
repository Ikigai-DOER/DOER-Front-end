import {Button, Divider, Form, Input, message} from "antd";
import React, {useEffect, useState} from "react";
import {RegistrationState, Roles} from "../constants";
import {useHistory} from "react-router";
import api from "../api";

const axios = require('axios').default;

export const ThirdStepRegistration = (props) => {
    const history = useHistory();

    const [form] = Form.useForm();

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            form={form}
            onFinish={async (values) => {
                const user = {
                    ...props.profile,
                    userProfile: {
                        ...props.profile.userProfile,
                        email: values.email,
                        username: values.username,
                        password1: values.password,
                        password2: values.password,
                    }
                };
                try {
                    await api.register(user, props.role);
                    history.push('/');
                    message.info('Uspesno ste se registrovali');
                } catch (_) {
                    history.push('/');
                    message.error('Niste se uspesno registrovali');
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
                name="email"
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
                    placeholder="Email"
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
                    {'Dalje >'}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type='default'
                        size='large'
                        style={{width: '100%'}}
                        onClick={() => props.setStep(RegistrationState.UserInfo)}>
                    {'< Nazad'}
                </Button>
            </Form.Item>
            <Divider/>
            <Form.Item>
                <Button type='dashed'
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
