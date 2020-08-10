import {Button, Divider, Form, Input} from "antd";
import React from "react";

export const FirstStepRegistration = (props) => {
    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            name="normal_login"
            onFinish={props.handleOnFinish}
        >
            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true, message: "Ovo polje ne sme biti prazno",
                    },
                    {
                        type: "string",
                        message: 'Unesite Vase ime.'
                    }
                ]}
            >
                <Input
                    placeholder="Ime"
                />
            </Form.Item>
            <Form.Item
                name="lastName"
                rules={[
                    {
                        required: true, message: "Ovo polje ne sme biti prazno",
                    },
                    {
                        type: "string",
                        message: 'Unesite Vase prezime.'
                    }
                ]}
            >
                <Input
                    placeholder="Prezime"
                />
            </Form.Item>
            <Form.Item
                name="phoneNo"
                rules={[
                    {
                        type: "number",
                        message: 'Unesite Vas broj telefona.'
                    }
                ]}
            >
                <Input
                    placeholder="Broj telefona"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size='large' style={{width: '100%'}}>
                    Sledeci korak
                </Button>

                <Divider>
                    Imate profil?
                </Divider>

                <Button type='default'
                        size='large'
                        style={{width: '100%'}}>
                    Ulogujte se
                </Button>
            </Form.Item>
        </Form>
    )
}