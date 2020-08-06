import React, {useState} from 'react';
import {Col, Rate, Row, Space, Tag} from "antd";
import DoerAvatar from "../DoerAvatar";
import './Profile.css'

const Profile = () => {
    const [rate, setRate] = useState(0);
    const [tags, setTags] = useState(['radim', 'gradim', 'pare da zaradim'])

    return (
            <Row
                align="middle"
                justify="start"
                style={{backgroundColor: 'whitesmoke', padding: 20}}
            >
                <Col span={8} flex={1} className="centered-column">
                    <DoerAvatar />
                </Col>
                <Col span={8} flex={1} className="centered-column">
                    <Space align="center">
                        <h1>Linus Torvalds</h1>
                    </Space>
                    <br/>
                    <Space align="center">
                        <h3>Ovo je description</h3>
                    </Space>
                    <br/>
                    <br/>
                    <Space align="center">
                        {tags.map(tag =>
                            <Tag color="purple" className="tag">{tag}</Tag>
                        )}
                    </Space>
                </Col>
                <Col span={8} flex={1} className="centered-column">
                    <Space align="center">
                        <Rate
                            value={rate}
                            onChange={setRate}
                        />
                        <p>
                            3/5
                        </p>
                    </Space>
                </Col>
            </Row>
    );
};

export default Profile;