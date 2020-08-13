import React from "react";
import {Affix, Alert, Avatar, Button, Col, Input, List, Row, Select, Spin, Tag} from "antd";
import './JobList.css';
import {useHistory} from "react-router";
import {formatCurrency, useApi} from "../utils";
import api from "../api";
import {Link} from "react-router-dom";
import Availability from "../components/Availability";
import moment from "moment";

const { Option } = Select;

const JobList = () => {

    let history = useHistory();

    const [{ data: professions }] = useApi(() => api.getProfessions(), []);
    const [{data, isLoading, isError}, setFn] = useApi(() => api.getJobs(), []);

    const changeFilters = filters => {
        if (filters.length === 0) {
            setFn(api.getJobs());
        } else {
            setFn(api.getFilteredJobs(filters));
        }
    };

    return (
        <div className="job-list">
            <Button
                type="primary"
                style={{ position: 'fixed', bottom: 30, right: 30 }}
                onClick={() => history.push('/site/job/new')}
            >
                Dodaj posao
            </Button>
            <Affix offsetTop={70}>
                <div className="search">
                    <Input placeholder="Pretraga" className="search-input" />
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={changeFilters}
                    >
                        {professions && professions.map(p => <Option key={p.title} value={p.title}>{p.title}</Option>)}
                    </Select>
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
                            <div
                                className="list-item"
                                key={item.title} // TODO: treba neki id
                            >
                                <List.Item
                                    onClick={() => {
                                        history.push(`job/${item.id}`); // TODO: change id to something
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.employer.profilePic} size={60} />}
                                        title={
                                            <Row justify="space-between">
                                                <Col>
                                                    <a href={item.href}>{item.title}</a>
                                                </Col>
                                                <Col>
                                                    {item.price &&
                                                        <h3>{formatCurrency(item.price)}</h3>
                                                    }
                                                </Col>
                                            </Row>
                                        }
                                        description={item.description}
                                    />
                                    <Row style={{marginBottom: 18}} justify="space-between">
                                        <Col>
                                            {item?.employer?.userProfile &&
                                                <Link to={`/site/profile/${'username'}`}>
                                                    <i className="fas fa-user" />
                                                    &nbsp;&nbsp;
                                                    {item.employer.userProfile.firstName + ' ' + item.employer.userProfile.lastName}
                                                </Link>
                                            }
                                        </Col>
                                        <Col>
                                            <Availability availability={item.status} />
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col>
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
                                        </Col>
                                        <Col>
                                            <p>{moment(item.publicationDate).format('DD.MM.YYYY. HH:mm')}</p>
                                        </Col>
                                    </Row>
                                </List.Item>
                            </div>
                        )}
                    />
                </Spin>
            </div>
        </div>
    );
};

export default JobList;