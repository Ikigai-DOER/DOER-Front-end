import {Button, Divider, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import {RegistrationState, Roles} from "../constants";
import {useHistory} from "react-router";

const axios = require('axios').default;

export const ThirdStepRegistration = (props) => {

    const [form] = Form.useForm();

    function registerUser(user) {
        if (props.role === Roles.DOER) {
            axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', user.userProfile)
                .then((resp) => axios.post('http://127.0.0.1:8000/doer/', {
                    user: resp.data.pk,
                    birth_date: user.birth_date,
                    phone_no: user.phone_no
                })
                    .then((resp) => console.log(resp.data)));
        } else {
            axios.post('http://127.0.0.1:8000/employer/', user.userProfile)
                .then((resp) => axios.post('http://127.0.0.1:8000/employer/', {
                    user: resp.data.pk,
                    birth_date: user.birth_date,
                    phone_no: user.phone_no
                }))
                .then( (resp) => console.log(resp.data));
        }
    }

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            form={form}
            onFinish={(values) => {
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
                registerUser(user);
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
