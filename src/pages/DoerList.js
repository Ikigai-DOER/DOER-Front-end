import React, {useState} from "react";
import {Affix, Alert, Avatar, Col, Input, List, Row, Spin, Tag} from "antd";
import './JobList.css';
import {useHistory} from "react-router";
import {useApi} from "../utils";
import api from '../api';
import Availability from "../components/Availability";
import DoerBadge from "../components/DoerBadge";
import DoerStatus from "../components/DoerStatus";

const DoerList = () => {
    let history = useHistory();

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getDoers(), []);

    return (
        <div className="job-list">
            <Affix offsetTop={70}>
                <div className="search">
                    <Input placeholder="Basic usage" />
                </div>
            </Affix>
            {isError &&  <Alert style={{marginTop: 20}} message="Problem u konekciji" type="error" />}
            <div className="list">
                <Spin spinning={isLoading}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={data}
                        renderItem={item => (
                            <div className="list-item">
                                <List.Item
                                    key={item.user_profile.username}
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
                                        description={(item.average_mark || 0) + ' / 5'}
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
                </Spin>
            </div>
        </div>
    );
};

export default DoerList;