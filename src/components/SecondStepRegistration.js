import {Button, DatePicker, Divider, Form, Input} from "antd";
import React from "react";
import locale from "antd/es/time-picker/locale/sr_RS";
import {RegistrationState} from "../constants";
import moment from "moment";
import {useHistory} from "react-router";

export const SecondStepRegistration = (props) => {
    const history = useHistory();

    return (
        <Form
            style={{marginTop: '1em'}}
            size='large'
            onFinish={(values) => {
                props.setProfile({
                    ...props.profile,
                    phone_no: values.phoneNo,
                    birth_date: values.birthDate.format('YYYY-MM-DD'),
                    userProfile: {
                        first_name: values.firstName,
                        last_name: values.lastName,
                    }
                });
                props.setStep(RegistrationState.ProfileInfo);
            }}
        >
            <Form.Item
                name="firstName"
                initialValue={props.profile.userProfile.first_name}
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
                initialValue={props.profile.userProfile.last_name}
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
                initialValue={props.profile.birth_date && moment(props.profile.birth_date)}
                rules={[
                    {
                        required: true, message: 'Ovo polje ne sme biti prazno'
                    },
                ]}>
                <DatePicker style={{width: '100%'}} placeholder="Datum rodjenja" locale={locale}
                            format={moment().format('DD-MM-YYYY')}/>
            </Form.Item>

            <Form.Item
                name="phoneNo"
                initialValue={props.profile.phone_no}
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
                    {'Dalje >'}
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type='default'
                        size='large'
                        style={{width: '100%'}}
                        onClick={() => props.setStep(RegistrationState.RoleInfo)}>
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
