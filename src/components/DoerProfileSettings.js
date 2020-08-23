import React, {useContext, useRef, useState} from 'react';
import {Button, Col, Divider, Form, Input, Row, Select, Tag} from "antd";
import "./DoerProfileSettings.css";
import UserContext from "../UserContext";
import api from "../api";
import FileUpload from "./UploadPicture";
import {LockOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";
import {useApi} from "../utils";
import {useParams} from "react-router-dom";

const {Option} = Select;

const DoerProfileSettings = (props) => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [form] = Form.useForm();
    const [formPassword] = Form.useForm();
    const userAccount = userInfo.user;
    const file = useRef(null);
    const userProfile = userAccount.user_profile;
    const history = useHistory();
    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const {jobId} = useParams();
    const [{data: professions}] = useApi(() => api.getProfessions(), []);

    const changeFilters = filters => {
        setSelectedProfessions(filters);
    };

    const getJobFn = () => {
        if (jobId) {
            return api.getJob(jobId);
        } else {
            return Promise.resolve();
        }
    };

    const [{data, isLoading, isError}, setFn] = useApi(() => getJobFn(), {});

    function createFormData(userAccount, userProfile) {
        const formData = new FormData();

        for (let key in userAccount.professions) {
            formData.append('professions', userAccount.professions[key]);
        }

        delete userAccount.professions;

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

    async function handleOnFinishPassword(values) {
        const passwordInfo = {
            new_password1: values.newPassword,
            new_password2: values.newPassword1,
        }

        await api.changePassword(passwordInfo);
        history.push('/');
    }

    async function handleOnFinish(values) {
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
            const resp = await api.setDoerProfile(userInfo.user.id, formData)
            setUserInfo({...userInfo, user: resp.data});
            history.push('/');
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
                        <Divider>Profilna slika</Divider>
                        <Form.Item
                            name="profilePicture"
                            initialValue={userAccount.profile_pic}
                        >
                            <Row align='center'>
                                <FileUpload accept={'image/*'}
                                            ref={file}
                                            multiple={false}
                                            imageUrl={userAccount.profile_pic}
                                />
                            </Row>
                        </Form.Item>

                        <Divider> Podaci o profilu</Divider>

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
                            {<Select
                                mode="multiple"
                                style={{width: '100%'}}
                                placeholder="Please select"
                                onChange={changeFilters}
                            >
                                {professions && professions.map(p => <Option key={p.title}
                                                                             value={p.title}>{p.title}</Option>)}
                            </Select>}
                        </Form.Item>
                        <Form.Item
                            name="availability"
                            initialValue={userAccount.availability}
                            rules={[
                                {required: true, message: 'Ovo polje ne sme biti prazno'},
                            ]}
                        >
                            <Select defaultValue={userAccount.availability} style={{width: '100%'}}>
                                <Option style={{backgroundColor: '#5cae5c', color: 'white'}}
                                        value="A">Slobodan</Option>
                                <Option style={{backgroundColor: '#a02e2e', color: 'white'}} value="B">Zauzet</Option>
                                <Option style={{backgroundColor: '#aeaeae', color: 'white'}}
                                        value="U">Nedostupan</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <div style={{textAlign: "center"}}>
                                <Button htmlType="submit">
                                    Potvrdi izmene
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>

                    <Divider>Lozinka</Divider>
                    {/*
                        Password changing form
                    */}
                    <Form
                        style={{marginTop: '1em'}}
                        size='large'
                        form={formPassword}
                        onFinish={handleOnFinishPassword}
                    >
                        <Form.Item
                            name="newPassword"
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
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Nova lozinka"
                            />
                        </Form.Item>
                        <Form.Item
                            name="newPassword1"
                            rules={[
                                {
                                    required: true, message: 'Ovo polje mora biti ispunjeno.'
                                },
                                {
                                    min: 8, message: 'Lozinka mora imati makar 8 karaktera.'
                                },
                                {
                                    validator: (_, value) => {
                                        if (value !== formPassword.getFieldValue('newPassword'))
                                            return Promise.reject('Lozinke moraju biti istovetne.');
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Potvrdite novu lozinku"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div style={{textAlign: "center"}}>
                                <Button htmlType="submit">
                                    Promeni lozinku
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
