import {Button, Divider, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import {RegistrationState, Roles} from "../constants";

const axios = require('axios').default;

export const ThirdStepRegistration = (props) => {
    const {profile} = props.profile;
    const [form] = Form.useForm();

    function registerUser(user) {
        if (props.role === Roles.DOER) {
            axios.post('http://127.0.0.1:8000/doer/', user)
                .then(() => alert('DOER GOESS BRRR'));
        } else {
            axios.post('http://127.0.0.1:8000/employer/', user).then(() => alert('EMPLOYER GOESS BRRR'));
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
                        username: values.username,
                        password: values.password,
                    }
                };

                console.log(user);

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
