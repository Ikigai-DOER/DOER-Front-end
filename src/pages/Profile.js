import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Rate, Row, Space, Spin, Tag, message} from "antd";
import DoerAvatar from "../components/DoerAvatar";
import './Profile.css'
import {useApi} from "../utils";
import {useHistory} from "react-router";
import {useParams} from "react-router-dom";
import api from "../api";

const Profile = () => {
    const history = useHistory();

    const { id } = useParams();

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getDoer(id), {});

    const [rate, setRate] = useState(0);

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
                    <DoerAvatar status={'online'} src={data.profile_pic} />
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
                            {data.average_mark} / 5
                        </p>
                    </Space>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={24} className="centered-column">
                    <Space>
                        <Button type="primary">
                            Unajmi
                        </Button>
                        <Button type="primary" danger>
                            Prijavi
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;