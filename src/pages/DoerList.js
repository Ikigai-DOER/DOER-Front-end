import React, {useState} from "react";
import {Affix, Alert, Avatar, Input, List, Spin, Tag} from "antd";
import './JobList.css';
import {useHistory} from "react-router";
import {useApi} from "../utils";
import api from '../api';

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
                                        history.push(`/site/doer/${item.user_profile.username}`);
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profile_pic} size={60} />}
                                        title={<span>{item.user_profile.first_name + ' ' + item.user_profile.last_name}</span>}
                                        description={item.average_mark}
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