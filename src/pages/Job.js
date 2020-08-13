import React, {useState} from 'react';
import {Alert, Button, Col, Form, Input, InputNumber, message, Radio, Row, Select, Spin, Tag} from "antd";
import './Job.css';
import api from "../api";
import {formatCurrency, useApi} from "../utils";
import {useHistory} from "react-router";
import {Link, useParams} from "react-router-dom";
import Availability from "../components/Availability";

const { Option } = Select;

const Job = () => {
    const history = useHistory();
    const { jobId } = useParams();

    const [{ data: professions }] = useApi(() => api.getProfessions(), []);
    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const [selected, setSelected] = useState('A');

    const readOnly = jobId !== undefined;

    const getJobFn = () => {
        if (jobId) {
            return api.getJob(jobId);
        } else {
            return Promise.resolve();
        }
    };

    const [{data, isLoading, isError}, setFn] = useApi(() => getJobFn(), {});


    const changeFilters = filters => {
        setSelectedProfessions(filters);
    };

    const submit = async (values) => {
        const job = {...values, professions: selectedProfessions};
        console.log('JOB', job);
        try {
            await api.postJob(job);
            message.info('Uspesno ste dodali posao');
            history.push('/site/job');
        } catch (err) {
            message.error('Posao nije dodan');
        }
    };

    return (
        <div className="new-job">
            {readOnly && isError &&  <Alert style={{marginTop: 20}} message="Problem u konekciji" type="error" />}
            <Spin
                spinning={readOnly && isLoading}
            >
                <div className="content">
                    <Form
                        onFinish={submit}

                    >
                        <Row style={{ textAlign: 'center' }}>
                            <Col span={24}>
                                <h1 style={{ fontSize: 40 }}>Dodaj posao</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <p>Naslov:</p>
                            </Col>
                            <Col span={20}>
                                <Form.Item
                                    name="title"
                                >
                                    {readOnly
                                        ? <p>{data.title}</p>
                                        : <Input placeholder="Naslov" />

                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <p className={readOnly ? "profesije-txt" : ""}>Profesije:</p>
                            </Col>
                            <Col span={readOnly ? 16 : 20}>
                                {readOnly
                                    ? (data.professions || []).map(profession => (
                                        <Tag
                                            key={profession}
                                            color="purple"
                                            className="tag"
                                            onClick={() => {
                                                history.push(`/profession/${profession}`);
                                            }}
                                        >
                                            {profession}
                                        </Tag>
                                    ))
                                    : <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={changeFilters}
                                    >
                                        {professions && professions.map(p => <Option key={p.title} value={p.title}>{p.title}</Option>)}
                                    </Select>
                                }
                            </Col>
                            {readOnly && data && data.employer &&
                                <Col span={4}>
                                    <Link to={`/site/doer/${'nekiuser'}`}>
                                        <i className="fas fa-user" />
                                        &nbsp;&nbsp;
                                        {data.employer.user_profile.first_name + ' ' + data.employer.user_profile.last_name}
                                    </Link>
                                </Col>
                            }
                        </Row>
                        <Row>
                            <Col span={4}>
                                <p style={{ marginTop: 6 }}>Cena:</p>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    name="price"
                                >
                                    {readOnly
                                        ? <p style={{ marginTop: 6 }}>{data.price ? formatCurrency(data.price) : 'Nema'}</p>
                                        : <InputNumber
                                            defaultValue={10}
                                            style={{ marginTop: 6 }}
                                            min={0}
                                            formatter={value => `€ ${value}`}
                                            parser={value => value.replace('€', '')}
                                            precision={2}
                                            step={10}
                                        />
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={readOnly ? 12 : 2}/>
                            <Col span={readOnly ? 4 : 14} style={{ marginTop: 6, paddingLeft: 16 }}>
                                <Form.Item
                                    name="status"
                                    initialValue="A"
                                >
                                    {readOnly
                                        ? <Availability availability={data.status} />
                                        : <Radio.Group className="radio" onChange={event => setSelected(event.target.value)} defaultValue="A">
                                            <Radio.Button value="A" className={selected === "A" ? "A" : ""}>Available</Radio.Button>
                                            <Radio.Button value="P" className={selected === "P" ? "P" : ""}>In progress</Radio.Button>
                                            <Radio.Button value="D" className={selected === "D" ? "D" : ""}>Done</Radio.Button>
                                            <Radio.Button value="C" className={selected === "C" ? "C" : ""}>Closed</Radio.Button>
                                        </Radio.Group>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <p>Opis:</p>
                            </Col>
                            <Col span={20}>
                                <Form.Item
                                    name="description"
                                >
                                    {readOnly
                                        ? <p>{data.description}</p>
                                        : <Input.TextArea placeholder="Opis" autoSize={true} />
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Col span={6}>
                                <Button
                                    style={{ width: '100%' }}
                                    type="default"
                                    onClick={() => history.goBack()}
                                >
                                    Nazad
                                </Button>
                            </Col>
                            <Col span={6}>
                                {readOnly
                                    ? <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        danger
                                    >
                                        Prijavi
                                    </Button>
                                    : <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Dodaj
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Spin>
        </div>
    );
};

export default Job;