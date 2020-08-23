import React, {useContext, useRef} from 'react';
import {Button, Col, Divider, Form, Input, Row} from "antd";
import "./DoerProfileSettings.css";
import UserContext from "../UserContext";
import api from "../api";
import FileUpload from "./UploadPicture";
import {BASE_URL} from "../constants";


const DoerProfileSettings = (props) => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [form] = Form.useForm();
    const userAccount = userInfo.user;
    // TODO: this is bad, pls fix
    if (!userAccount.profile_pic.toString().startsWith('http://'))
        userAccount.profile_pic = `${BASE_URL}${userAccount.profile_pic}`

    const file = useRef(null);
    const userProfile = userAccount.user_profile;

    function createFormData (userAccount, userProfile) {
        const formData = new FormData();

        for (let key in userAccount) {
            userAccount[key] !== null &&
            userAccount[key] !== undefined &&
            formData.append(key, userAccount[key]);
        }

        for (let key in userProfile) {
            formData.append(`user_profile.${key}`, userProfile[key]);
        }

        return formData;
    }

    function handleOnFinish(values) {
        const user_profile = {
            ...userInfo.user.user_profile,
            username: values.username,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
        };

        const userAccount = {
            user_id: userInfo.user.id,
            birth_date: values.birthDate,
            phone_no: values.phoneNo,
            profile_pic: file.current.files[0],
            professions: values.professions,
            availability: values.availability
        }

        let formData = createFormData(userAccount, user_profile)

        try {
            api.setDoerProfile(userInfo.user.id, formData).then( resp =>
                setUserInfo({...userInfo, user:resp.data})
            );
        } catch (error) {
            console.error(error)
        }
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
                            <FileUpload accept={'image/*'}
                                        ref={file}
                                        multiple={false}
                                        imageUrl={userAccount.profile_pic}
                            />
                        </Form.Item>

                        <Divider/>

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
                            rules={[
                                {required: true, message: 'Ovo polje ne sme biti prazno'},
                            ]}
                        >
                            <Input
                                placeholder="Profesije"
                            />
                        </Form.Item>
                        <Form.Item
                            name="availability"
                            initialValue={userAccount.availability}
                            rules={[
                                {required: true, message: 'Ovo polje ne sme biti prazno'},
                            ]}
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
