import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Col, Rate, Row, Space, Spin, Tag, message, Modal, Form, Input} from "antd";
import DoerAvatar from "../components/DoerAvatar";
import './Doer.css'
import {useApi} from "../utils";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import api from "../api";
import UserContext from "../UserContext";

const Doer = () => {
    const history = useHistory();
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);

    const [messageForm] = Form.useForm(null);

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getDoer(id), {});

    const [rate, setRate] = useState(0);

    const [showMessageModal, setShowMessageModal] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => setRate(data.user_rating || 0), [data]);

    const doRateDoer = async (value) => {
        try {
            await api.rateDoer(value, id);
            message.info('Uspesno ste ocenili DOER-a');
            setRate(value);
        } catch (error) {
            message.error('Greska u ocenjivanju DOER-a');
        }
    };

    const sendMessage = async () => {
        if (id) {
            try {
                const messageText = messageForm.getFieldValue('message');
                const response = await api.getDoer(id);
                const receiver = response.data.user_profile.id;
                await api.sendMessage(receiver, messageText);
                message.info('Uspešno ste poslali poruku');
                setShowMessageModal(false);
                messageForm.resetFields();
            } catch (e) {
                message.error('Greška pri slanju poruke')
            }
        }
    };

    const addToFavourites = async () => {
        if (id) {
            try {
                await api.addFavourite(id);
                message.info('Uspešno ste dodali doer-a u listu favorita');
            } catch (err) {
                message.error('Greška pri dodavanju u favorite');
            }
        }
    };

    const reportProfile = async () => {
        const description = form.getFieldValue('description');
        const reportData = {
            profile: data.user_profile.id,
            description
        };
        try {
            await api.reportProfile(reportData);
            form.resetFields();
            setShowModal(false);
            message.info('Uspešno ste prijavili profil');
        } catch (err) {
            message.error('Greška u prijavljivanju profila');
        }
    };

    if (isLoading) {
        return (
            <Spin size="large" style={{ width: '100%', height: '100%', marginTop: 200 }} />
        );
    }

    if (isError) {
        return (
            <Alert
                message="Error"
                type="error"
                style={{margin: 20}}
            />
        );
    }

    if (Object.keys(data).length === 0) {
        return <></>;
    }

    return (
        <div className="profile">
            <Row
                align="middle"
                justify="start"
            >
                <Col span={8} flex={1} className="centered-column">
                    {/* TODO: online nije stalno */}
                    <DoerAvatar status={data.availability || ''} src={data.profile_pic} alt={data.user_profile.first_name + ' ' + data.user_profile.last_name} />
                </Col>
                <Col span={8} flex={1} className="centered-column">
                    <Space align="center">
                        <h1>{data.user_profile.first_name + ' ' + data.user_profile.last_name}</h1>
                    </Space>
                    <br/>
                    <Space align="center">
                        <h3>Ovo je description</h3>
                    </Space>
                    <br/>
                    <br/>
                    <Space align="center">
                        {data.professions.map(profession =>
                            <Tag
                                key={profession}
                                color="purple"
                                className="tag"
                                onClick={() => {
                                    history.push(`/profession/${profession}`);
                                }}
                            >
                                {profession}
                            </Tag>
                        )}
                    </Space>
                </Col>
                <Col span={8} flex={1} className="centered-column">
                    <Space align="baseline" size={20}>
                        <div className="rating">
                            <Rate
                                value={rate}
                                onChange={doRateDoer}
                            />
                        </div>
                        <p>
                            {data.average_mark || 0} / 5
                        </p>
                    </Space>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={24} className="centered-column">
                    <Space>
                        <Button type="primary" onClick={() => setShowMessageModal(true)}>
                            Pošalji poruku
                        </Button>
                        {userInfo?.doer !== null && userInfo.doer === false &&
                            <Button
                                type="primary"
                                onClick={addToFavourites}
                            >
                                Dodaj u favorite
                            </Button>
                        }
                        <Button type="primary" danger onClick={() => setShowModal(true)}>
                            Prijavi
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Modal
                okText="Pošalji poruku"
                cancelText="Poništi"
                visible={showMessageModal}
                onOk={sendMessage}
                onCancel={() => {
                    setShowMessageModal(false);
                    messageForm.resetFields();
                }}
                closable
            >
                <Form
                    form={messageForm}
                >
                    <Form.Item
                        style={{ marginTop: 20 }}
                        name="message"
                        label="Poruka"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                okText="Prijavi"
                cancelText="Poništi"
                visible={showModal}
                onOk={reportProfile}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                }}
                closable={true}
            >
                <h2>Prijava sumnjivog posla</h2>
                <Row justify="space-between" style={{ marginTop: 20 }}>
                    <Col span={3}>
                        <p style={{ padding: 6 }}>Opis: </p>
                    </Col>
                    <Col span={20}>
                        <Form
                            form={form}
                        >
                            <Form.Item
                                name="description"
                            >
                                <Input.TextArea
                                    placeholder="Ovde napišite zašto prijavljujete posao."
                                    autoSize={true}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default Doer;