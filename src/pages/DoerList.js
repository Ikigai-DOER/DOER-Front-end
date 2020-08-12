import React, {useState} from "react";
import {Affix, Alert, Avatar, Input, List, Spin, Tag} from "antd";
import './JobList.css';
import {useHistory} from "react-router";
import {useApi} from "../utils";
import api from '../api';

const DoerList = props => {

    let history = useHistory();


    // for (let i = 0; i < 23; i++) {
    //     mockData.push({
    //         id: i,
    //         href: 'https://ant.design',
    //         title: `ant design part ${i}`,
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //         description:
    //             'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    //         content:
    //             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    //     });
    // }

    const [{data, isLoading, isError}, setFn] = useApi(api.getDoers(), []);

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
                            <div className="list-item list-item-clickable">
                                <List.Item
                                    key={item.username}
                                    onClick={() => {
                                        history.push(`/site/profile/${item.username}`);
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profilePic} />}
                                        title={<span>{item.firstName}</span>}
                                        description={item.averageMark}
                                    />
                                    {item.professions.map(profession => (
                                        <Tag
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