import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Col, List, Row, Space, Spin, Tag} from "antd";
import {useApi} from "../utils";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import api from "../api";
import './Employer.css';
import './JobList.css';
import moment from "moment";
import DoerStatus from "../components/DoerStatus";

const Employer = () => {
    const history = useHistory();
    const { id } = useParams();

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getEmployer(id), {});
    const [favourites, setFavourites] = useState(null);

    const fetchFavourites = async (ids) => {
        const response = await Promise.all(ids.map(id => api.getDoer(id)));
        setFavourites(response.map(r => r.data));
    };

    useEffect(() => {
        if (!favourites) {
            if (Object.keys(data).length > 0) {
                console.log('DATA', data);
                fetchFavourites(data.favorite_doers);
            }
        }
    }, [data]);

    if (isError) {
        return (
            <Alert message="Error" />
        );
    }

    if (isLoading) {
        return (
            <div style={{ width: '100%', marginTop: 120 }}>
                <Spin spinning={true} style={{ width: '100%' }} />
            </div>
        );
    }

    return (
        <div className="employer">
            <Row align="middle" className="container">
                <Col span={8} className="centered-column">
                    <Avatar
                        shape="circle"
                        size={200}
                        src={data?.user_profile?.profile_pic}
                        alt={data?.user_profile?.username ?? ''}
                    />
                </Col>
                <Col span={8} className="centered-column">
                    <Space align="center">
                        {data?.user_profile?.username &&
                            <p style={{ fontSize: '1rem', color: '#18abff' }}>
                                <i className="fas fa-user" />
                                    &nbsp;&nbsp;
                                    {data.user_profile.username}
                            </p>
                        }
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
                <p style={{ width: '100%', textAlign: 'center', marginTop: 30, fontSize: '2em' }}>Favoriti</p>
                {favourites &&
                    <div className="job-list">
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={favourites}
                            renderItem={item => (
                                <div className="list-item">
                                    <List.Item
                                        key={item.id}
                                        onClick={() => {
                                            history.push(`/site/doer/${item.id}`);
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