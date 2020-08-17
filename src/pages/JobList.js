import React, {useContext, useEffect, useState} from "react";
import {Affix, Alert, Avatar, Button, Col, Collapse, Input, List, Row, Select, Spin, Tag} from "antd";
import './JobList.css';
import {useHistory} from "react-router";
import {formatCurrency} from "../utils";
import api from "../api";
import Availability from "../components/Availability";
import {PlusOutlined} from "@ant-design/icons";
import moment from "moment";
import UserContext from "../UserContext";

const { Option } = Select;
const { Panel } = Collapse;

const JobList = () => {

    let history = useHistory();
    const { userInfo } = useContext(UserContext);
    const personalPath = history.location.pathname.includes('personal');
    const [personal, setPersonal] = useState(personalPath);
    useEffect(() => {
        if (personalPath !== personal) {
            setPersonal(personalPath);
        }
    }, [personalPath])

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [professions, setProfessions] = useState([]);
    const [filters, setFilters] = useState(professions);

    const [filtersExpanded, setFiltersExpanded] = useState(false);

    async function fetch() {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = personal
                ? await api.getPersonalJobs()
                : filters.length === 0
                    ? await api.getJobs()
                    : await api.getFilteredJobs(filters);
            setIsLoading(false);
            setData(response.data);
        } catch (err) {
            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect(() => {
        async function getProfessions() {
            try {
                const result = await api.getProfessions();
                setProfessions(result.data);
            } catch (e) {

            }
        }
        getProfessions();
    }, []);

    useEffect(() => {
        console.debug("USEEFFECT RUNNING");
        fetch();
    }, [personal, filters]);

    const filterData = () =>
        filters.length === 0
            ? data
            : data
                .filter(job => job.professions
                    .filter(p => filters.includes(p)).length > 0);

    return (
        <div className="job-list">
            {userInfo && userInfo?.doer !== null && userInfo.doer === false &&
                <Button
                    className="btn-add-job"
                    type="primary"
                    onClick={() => history.push('/site/job/new')}
                    icon={<PlusOutlined />}
                    >
                        Dodaj posao
                    </Button>
            }
            <Affix offsetTop={70}>
                <div className="search">
                    <Row justify="space-between">
                        <Col span={19}>
                            <Input placeholder="Pretraga" className="search-input" />
                        </Col>
                        <Col span={4}>
                            <Button
                                style={{ width: '100%' }}
                                onClick={() => setFiltersExpanded(!filtersExpanded)}
                            >
                                {filtersExpanded ? 'Sakrij filtere' : 'Prikazi filtere'}
                            </Button>
                        </Col>
                    </Row>
                    {filtersExpanded &&
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={setFilters}
                        >
                            {professions && professions.map(p => <Option key={p.title} value={p.title}>{p.title}</Option>)}
                        </Select>
                    }
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
                                key={item.id}
                            >
                                <List.Item
                                    onClick={() => {
                                        history.push(`job/${item.id}`);
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
                                                <p
                                                    style={{
                                                        color: '#18abff',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        history.push(`/site/employer/${item.employer.id}`);
                                                    }}
                                                >
                                                    <i className="fas fa-user" />
                                                    &nbsp;&nbsp;
                                                    {item.employer.user_profile.first_name + ' ' + item.employer.user_profile.last_name}
                                                </p>
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
                                                    onClick={(event) => {
                                                        event.stopPropagation();
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