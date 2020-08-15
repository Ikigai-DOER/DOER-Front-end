import React, {useEffect, useState} from "react";
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
    const personal = history.location.pathname.includes('personal');

    const jobFn = personal ? api.getPersonalJobs() : api.getJobs();

    const [{ data: professions }] = useApi(() => api.getProfessions(), []);
    const [{data, isLoading, isError}, setFn] = useApi(() => jobFn, []);

    const [filters, setFilters] = useState(professions);

    const changeFilters = filters => {
        if (!personal) {
            if (filters.length === 0) {
                setFn(api.getJobs());
            } else {
                setFn(api.getFilteredJobs(filters));
            }
        } else {
            setFilters(filters);
        }
    };

    const filterData = () =>
        filters.length === 0
            ? data
            : data
                .filter(job => job.professions
                    .filter(p => filters.includes(p)).length > 0);

    return (
        <div className="job-list">
            <Button
                type="primary"
                style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 3 }}
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
                        dataSource={!personal ? data : filterData()}
                        renderItem={item => (
                            <div
                                className="list-item"
                                key={item.id} // TODO: treba neki id
                            >
                                <List.Item
                                    onClick={() => {
                                        history.push(`job/${item.id}`); // TODO: change id to something
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.employer.profile_pic} size={60} />}
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
                                            {item?.employer?.user_profile &&
                                                <Link to={`/site/profile/${'username'}`}>
                                                    <i className="fas fa-user" />
                                                    &nbsp;&nbsp;
                                                    {item.employer.user_profile.first_name + ' ' + item.employer.user_profile.last_name}
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
                                            <p>{moment(item.publication_date).format('DD.MM.YYYY. HH:mm')}</p>
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