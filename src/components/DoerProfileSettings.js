import React, {useContext} from 'react';
import {Button, Col, Divider, Form, Input, Row, Upload} from "antd";
import "./DoerProfileSettings.css";
import UserContext from "../UserContext";
import UploadPicture from "./UploadPicture";
import api from "../api";


const DoerProfileSettings = (props) => {
    const {userInfo} = useContext(UserContext);
    const [form] = Form.useForm();
    const userAccount = userInfo.user;
    const userProfile = userAccount.user_profile;

    function handleOnFinish(values) {
        const newUserInfo = {
            user_profile: {
                ...userInfo.user.user_profile,
                username: values.username,
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
            },
            birth_date: values.birthDate,
            phone_no: values.phoneNo
        };
        console.log(values.username);
        api.setDoerProfile(newUserInfo);
    }

    return (
        <Row style={{marginTop: 20}} align="center">
            <Col span="8">
                <div className='settings-form' style={{paddingTop: 20}}>
                    <Form
                        style={{marginTop: '1em'}}
                        size='large'
                        form={form}
                        onFinish={handleOnFinish}
                    >
                        <Form.Item
                            name="profilePicture"
                            initialValue={userAccount.profile_pic}
                        >
                            <UploadPicture imageUrl={userAccount.profile_pic}/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            initialValue={userProfile.username}
                            rules={[
                                {
                                    required: true,
                                    message: "Ovo polje ne sme biti prazno."
                                }
                            ]}
                        >
                            <Input
                                placeholder="Korisnicko ime"
                                type="string"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            initialValue={userProfile.email}
                            rules={[
                                {
                                    required: true,
                                    message: "Ovo polje ne sme biti prazno"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            initialValue={userProfile.first_name}
                            rules={[
                                {
                                    required: true,
                                    message: "Ovo polje ne sme biti prazno"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Ime"
                                type="string"
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            initialValue={userProfile.last_name}
                            rules={[
                                {
                                    required: true,
                                    message: "Ovo polje ne sme biti prazno"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Prezime"
                                type="string"
                            />
                        </Form.Item>
                        <Form.Item
                            name="birthDate"
                            initialValue={userAccount.birth_date}
                            rules={[
                                {
                                    required: true,
                                    message: "Ovo polje ne sme biti prazno"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Datum rodjenja"
                                type="date"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNo"
                            initialValue={userAccount.phone_no}
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
                        <Form.Item
                            name="professions"
                            initialValue={userAccount.professions}
                        >
                            <Input
                                placeholder="Profesije"
                            />
                        </Form.Item>
                        <Form.Item
                            name="availability"
                            initialValue={userAccount.availability}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message:"Ovo polje ne sme biti prazno"
                            //     }
                            // ]}
                        >
                            <Input
                                placeholder="Dostupnost"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Divider/>
                        </Form.Item>
                        <Form.Item>
                            <div style={{textAlign: "center"}}>
                                <Button htmlType="submit">
                                    Potvrdi izmene
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default DoerProfileSettings;
