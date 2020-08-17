import React, {useEffect, useState} from 'react';
import {Affix, Alert, Avatar, Col, Input, List, Row, Spin, Tag} from "antd";
import DoerStatus from "../components/DoerStatus";
import {useHistory} from "react-router";
import {useApi} from "../utils";
import './JobList.css';
import api from "../api";
import moment from "moment";

const EmployerList = () => {
    const history = useHistory();

    const [{data, isLoading, isError}, setFn] = useApi(() => api.getEmployers(), []);

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
                                    key={item.id}
                                    onClick={() => {
                                        history.push(`/site/employer/${item.id}`);
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profile_pic} size={60} />}
                                        title={item.user_profile.first_name + ' ' + item.user_profile.last_name}
                                        description={item?.user_profile?.last_login && ('Posledja aktivnost: ' + moment(item.user_profile.last_login).format('DD.MM.YYYY. HH:mm'))}
                                    />
                                    {item?.phone_no &&
                                        <Tag
                                            color="purple"
                                            className="tag list-tag"
                                        >
                                            {'Broj telefona: ' + item.phone_no}
                                        </Tag>
                                    }
                                    {item?.user_profile?.email &&
                                    <Tag
                                        color="purple"
                                        className="tag list-tag"
                                    >
                                        {'Email: ' + item.user_profile.email}
                                    </Tag>
                                    }
                                    {/*{item.favourite_doers.map(doer => (*/}
                                    {/*    <Tag*/}
                                    {/*        key={doer.user_profile.username}*/}
                                    {/*        color="purple"*/}
                                    {/*        className="tag list-tag"*/}
                                    {/*        onClick={() => {*/}
                                    {/*            history.push(`/profession/${doer.id}`);*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        {doer.user}*/}
                                    {/*    </Tag>*/}
                                    {/*))}*/}
                                </List.Item>
                            </div>
                        )}
                    />
                </Spin>
            </div>
        </div>
    );
};

export default EmployerList;