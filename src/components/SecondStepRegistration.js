import {Button, Col, Divider, Form, Input} from "antd";
import React from "react";

export const SecondStepRegistration = (props) => {

    function handleValidatePassword() {
        return true;
    }

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            name="normal_login"
            onFinish={props.handleOnFinish}
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
                        validator: handleValidatePassword,
                    }
                ]}
            >
                <Input.Password
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
                    Nazad
                </Button>
            </Form.Item>
        </Form>
    )
}