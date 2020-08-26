import React, {useContext, useEffect, useRef, useState} from 'react';
import {Avatar, Col, Form, Input, List, message, Popover, Row} from "antd";
import './Messages.css';
import SendOutlined from "@ant-design/icons/lib/icons/SendOutlined";
import api from "../api";
import UserContext from "../UserContext";
import {uniq} from "lodash";
import moment from "moment";
import {BASE_URL} from "../constants";

const Messages = () => {

    const { userInfo } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState(null);
    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        console.log('createUser', messages, userInfo);
        if (messages && messages.length > 0 && userInfo) {
            const messageUsers = uniq(messages.flatMap(m => [m.sender, m.receiver])).filter(id => id !== userInfo.user.user_profile.id);
            async function fetchUsers() {
                const response = await Promise.all(messageUsers.map(id => api.getUserInfo(id)));
                setUsers(response.map(r => r.data));
            }
            fetchUsers();
        }
    }, [messages, userInfo]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await api.getMessages();
                setMessages(response.data);
            } catch (err) {
                message.error('Greška pri dobijanju poruka');
            }
        }
        fetchMessages();
    }, []);

    // used for scrolling messages
    const ref = useRef(null);

    // scroll messages to se most recent ones (bottom)
    useEffect(() => {
        setTimeout(() => {
            ref.current.scrollTo(0, ref.current.scrollTopMax);
        }, 500)
    }, []);

    useEffect(() => {
        ref.current.scrollTo(0, ref.current.scrollTopMax);
    }, [receiver]);

    const [form] = Form.useForm();

    const sendMessage = async () => {
        try {
            const text = form.getFieldValue('text');
            const response = await api.sendMessage(receiver, text);
            setMessages([...messages, response.data]);
            form.resetFields();
        } catch (err) {
            message.error('Greška pri slanju poruke');
        } finally {
            ref.current.scrollTo(0, ref.current.scrollTopMax);
        }
    };

    const getLastMessage = id => {
        console.log("USERINFOOOOOO", userInfo)

        const filtered = messages.filter(m =>
            (m.sender === id && m.receiver === userInfo.user.user_profile.id) ||
            (m.receiver === id && m.sender === userInfo.user.user_profile.id)
        );

        console.log("FILTERED", filtered)
        if (filtered.length > 0) {
            return filtered[filtered.length - 1]
        }
    }

    return (
        <div className="messages">
            <Row>
                <Col span={6} className="people-list">
                    <List
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={item => (
                            <List.Item
                                className="people-list-item"
                                style={{ backgroundColor: receiver === item.user.user_profile.id ? 'whitesmoke' : 'white' }}
                                onClick={() => setReceiver(item.user.user_profile.id)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={BASE_URL + item.user.profile_pic} />}
                                    title={<a href="https://ant.design">{
                                        item.user.user_profile.first_name + ' ' + item.user.user_profile.last_name
                                    }</a>}
                                    description={getLastMessage(item.user.user_profile.id)?.message || "prazno"}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={18} className="content-col">
                    <div className="flex-messages">
                        <div className="content">
                            <div className="content-inner" ref={ref}>
                                {userInfo && messages && messages.filter(m => m.sender === receiver || m.receiver === receiver).map(message => (
                                    <Row style={{ marginBottom: 6 }} align={userInfo.user.user_profile.id === message.receiver ? "start" : "end"}>
                                        <Col>
                                            <Popover
                                                content={moment(message.timestamp).format('DD.MM.YYYY. HH:mm')}
                                            >
                                                <div className={"message-content " + (userInfo.user.user_profile.id === message.receiver ? "left" : "right")}>
                                                    {message.message.split(/\r?\n/).filter(s => s.length > 0).map(row => (
                                                        <p style={{ margin: 0 }}>{row}</p>
                                                    ))}
                                                </div>
                                            </Popover>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        </div>
                        <div className="message-input">
                            <Row>
                                <Col span={20}>
                                    <Form
                                        form={form}
                                    >
                                        <Form.Item
                                            name="text"
                                        >
                                            <Input.TextArea
                                                rows={1}
                                                className="text"
                                            />
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col span={4}>
                                    <SendOutlined onClick={sendMessage} className="send"/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Messages;