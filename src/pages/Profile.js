import React, {useState} from 'react';
import {Button, Col, Rate, Row, Space, Tag} from "antd";
import DoerAvatar from "../components/DoerAvatar";
import './Profile.css'

const Profile = () => {
    const [rate, setRate] = useState(0);
    const [tags, setTags] = useState(['radim', 'gradim', 'pare da zaradim']);

    return (
        <div className="profile">
            <Row
                align="middle"
                justify="start"
            >
                <Col span={8} flex={1} className="centered-column">
                    <DoerAvatar status={'online'} />
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
                    <Space align="baseline" size={20}>
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
            <br/>
            <Row>
                <Col span={24} className="centered-column">
                    <Button type="primary">
                        Unajmi
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;