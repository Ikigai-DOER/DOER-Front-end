import React from 'react';
import {Avatar, Col, List, Row, Space, Tag} from "antd";
import {useApi} from "../utils";
import {useHistory} from "react-router";
import {Link, useParams} from "react-router-dom";
import api from "../api";
import './Employer.css';
import moment from "moment";
import DoerStatus from "../components/DoerStatus";

const Employer = () => {
    const history = useHistory();
    const { id } = useParams();

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getEmployer(id), {});
    // const []

    if (isError) {
        return (
            <p>Error</p>
        );
    }

    if (isLoading) {
        return (
            <p>Loading</p>
        );
    }

    return (
        <div className="employer">
            <div>{JSON.stringify(data)}</div>
            <Row align="middle">
                <Col span={8} className="centered-column">
                    <Avatar
                        shape="circle"
                        size={200}
                        src="https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png"
                        alt="Linus Torvalds"
                    />
                </Col>
                <Col span={8} className="centered-column">
                    <Space align="center">
                        <Link to={''}>
                            {data?.user_profile?.username &&
                                data.user_profile.username
                            }
                        </Link>
                    </Space>
                    <br/>
                    <Space align="center">
                        <h1>
                            {data?.user_profile?.first_name && data?.user_profile?.last_name &&
                                data.user_profile.first_name + ' ' + data.user_profile.last_name
                            }
                        </h1>
                    </Space>
                    <br/>
                    <Space align="center">
                        <p>
                            {data?.user_profile?.email &&
                                'Email: ' + data.user_profile.email
                            }
                        </p>
                    </Space>
                    <br/>
                    <Space align="center">
                        <p>
                            {data?.phone_no &&
                                'Broj telefona: ' + data.phone_no
                            }
                        </p>
                    </Space>
                </Col>
                <Col span={8} className="centered-column">
                    {data?.user_profile?.date_joined &&
                        <p>Pridruzio se na: {moment(data.user_profile.date_joined).format('DD.MM.YYYY.')}</p>
                    }
                    {data?.user_profile?.last_login &&
                        <p>Posledja aktivnost: {moment(data.user_profile.last_login).format('DD.MM.YYYY. HH:mm')}</p>
                    }
                </Col>
            </Row>
            <div>
                Favoriti
                {false &&
                    <div>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={data}
                            renderItem={item => (
                                <div className="list-item">
                                    <List.Item
                                        key={item.user_profile.username}
                                        onClick={() => {
                                            history.push(`/site/doer/${item.user_profile.id}`);
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.profile_pic} size={60} />}
                                            title={
                                                <Row justify="space-between">
                                                    <Col>
                                                        <span>{item.user_profile.first_name + ' ' + item.user_profile.last_name}</span>
                                                    </Col>
                                                    <Col>
                                                        <DoerStatus status={item.availability} />
                                                    </Col>
                                                </Row>
                                            }
                                            description={item.average_mark + ' / 5'}
                                        />
                                        {item.professions.map(profession => (
                                            <Tag
                                                key={profession}
                                                color="purple"
                                                className="tag list-tag"
                                                onClick={() => {
                                                    history.push(`/profession/${profession}`);
                                                }}
                                            >
                                                {profession}
                                            </Tag>
                                        ))}
                                    </List.Item>
                                </div>
                            )}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Employer;