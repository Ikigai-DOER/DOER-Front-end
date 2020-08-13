import {Button, DatePicker, Divider, Form, Input} from "antd";
import React from "react";
import locale from "antd/es/time-picker/locale/sr_RS";
import {RegistrationState} from "../constants";
import moment from "moment";

export const SecondStepRegistration = (props) => {
    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            onFinish={(values) => {
                props.setProfile({
                    ...props.profile,
                    phoneNo: values.phoneNo,
                    birthDate: values.birthDate.format('YYYY-MM-DD'),
                    userProfile: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                    }
                });
                props.setStep(RegistrationState.ProfileInfo);
            }}
        >
            <Form.Item
                name="firstName"
                initialValue={props.profile.userProfile.firstName}
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
                initialValue={props.profile.userProfile.lastName}
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
                name="birthDate"
                rules={[
                    {
                        required: true, message: 'Ovo polje ne sme biti prazno'
                    },
                ]}>
                {/*TODO: default value when coming back from third step*/}
                <DatePicker style={{width: '100%'}} placeholder="Datum rodjenja" locale={locale}
                            format={moment().format('DD-MM-YYYY')}/>
            </Form.Item>

            <Form.Item
                name="phoneNo"
                initialValue={props.profile.phoneNo}
                rules={[
                    {
                        type: "string",
                        required: true,
                        message: 'Unesite Vas broj telefona.'
                    }, {
                        validator: (_, value) => {
                            if (value && !value.match(/^(\+\d{1,3})?[\s-/]?\d{2,3}([\s-/]?\d{2,3}){2,3}$/))
                                return Promise.reject("Unesite ispravan broj telefona.");
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input
                    placeholder="Broj telefona"
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
                        onClick={() => props.setStep(RegistrationState.RoleInfo)}>
                    Nazad
                </Button>
            </Form.Item>
        </Form>
    )
}
