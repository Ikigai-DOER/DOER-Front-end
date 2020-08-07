import React, {useState} from "react";
import {Avatar, Input, List} from "antd";
import './JobList.css';
import {useHistory} from "react-router";

const DoerList = props => {

    let history = useHistory();

    const mockData = [];

    for (let i = 0; i < 23; i++) {
        mockData.push({
            id: i,
            href: 'https://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    const [listData, setListData] = useState(mockData);

    return (
        <div className="job-list">
            <div className="search">
                <Input placeholder="Basic usage" />
            </div>
            <div className="list">
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <div className="list-item">
                            <List.Item
                                key={item.id}
                                onClick={() => {
                                    history.push(`/site/profile/${item.id}`);
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default DoerList;