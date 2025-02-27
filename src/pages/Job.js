import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    List,
    message,
    Modal,
    Radio,
    Row,
    Select,
    Spin,
    Tag
} from "antd";
import './Job.css';
import api from "../api";
import {formatCurrency, useApi} from "../utils";
import {useHistory} from "react-router";
import {Link, useParams} from "react-router-dom";
import Availability from "../components/Availability";
import UserContext from "../UserContext";

const { Option } = Select;

const Job = () => {
    const history = useHistory();
    const { jobId } = useParams();
    const { userInfo } = useContext(UserContext);

    const [{ data: professions }] = useApi(() => api.getProfessions(), []);
    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const [selected, setSelected] = useState('A');

    const [showModal, setShowModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const readOnly = jobId !== undefined;

    const [location, setLocation] = useState(null);
    useEffect(() => {
        if (!readOnly) {
            navigator.geolocation.getCurrentPosition(loc => {
                setLocation({lat: loc.coords.latitude, lng: loc.coords.longitude});
            });
        }
    }, [readOnly]);

    const getJobFn = () => {
        if (jobId) {
            return api.getJob(jobId);
        } else {
            return Promise.resolve();
        }
    };

    const [{data, isLoading, isError}, setFn] = useApi(() => getJobFn(), {});

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await api.jobSubmissions(jobId);
                try {
                    let subs = await Promise.all(response.data.map(r => api.getDoer(r.doer)));
                    subs = subs.map(s => s.data);
                    console.log("SUBS", subs);
                    const result = response.data.map(sub => ({...sub, doer: subs.find(s => s.id === sub.doer)}));
                    console.log("result", result);
                    setSubmissions(result);
                } catch (err) {

                }
            } catch (err) {

            }
        }
        if (jobId) {
            fetch();
        }
    }, [jobId]);

    const [form] = Form.useForm();
    const [submitForm] = Form.useForm();

    const changeFilters = filters => {
        setSelectedProfessions(filters);
    };

    const submit = async (values) => {
        const job = {...values, professions: selectedProfessions};
        if (location) {
            job.location = `${location.lat},${location.lng}`;
        }
        try {
            await api.postJob(job);
            message.info('Uspesno ste dodali posao');
            history.push('/site/job');
        } catch (err) {
            message.error('Posao nije dodan');
        }
    };

    const reportJob = async () => {
        const description = form.getFieldValue('description');
        const data = {
            request: jobId,
            description
        };
        try {
            await api.reportJob(data);
            form.resetFields();
            setShowModal(false);
            message.info('Uspešno ste prijavili posao');
        } catch (err) {
            message.error('Greška u prijavljivanju posla');
        }
    };

    const submitRequest = async () => {
        const offer = submitForm.getFieldValue('offer');
        const submissionData = {request: +jobId, offer};
        try {
            await api.submitJobRequest(submissionData);
            console.log("PORUKA SE SALJE", data, offer);
            if (data?.employer?.id) {
                try {
                    await api.sendMessage(data.employer.user_profile.id, offer);
                } catch (err) {
                    message.error("Poruka nije poslana");
                }
            }
            message.info('Uspešno ste se prijavili za posao');
            setShowSubmitModal(false);
        } catch (err) {
            message.error('Greška u prijavljivanju za posao');
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
                        {!readOnly &&
                        <Row style={{ textAlign: 'center' }}>
                            <Col span={24}>
                                <h1 style={{ fontSize: 40 }}>Dodaj posao</h1>
                            </Col>
                        </Row>
                        }
                        {location !== null &&
                            <Row style={{ textAlign: 'center', marginBottom: 20 }}>
                                <Col span={24}>
                                    <a href={`https://gps-coordinates.org/my-location.php?lat=${location.lat}&lng=${location.lng}`} target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-map-marker-check"/>
                                        Lokacija ({`${location.lat},${location.lng}`})
                                    </a>
                                </Col>
                            </Row>
                        }
                        <Row>
                            <Col span={4}>
                                <p>Naslov:</p>
                            </Col>
                            <Col span={readOnly ? 16 : 20}>
                                <Form.Item
                                    name="title"
                                >
                                    {readOnly
                                        ? <p>{data.title}</p>
                                        : <Input placeholder="Naslov" />

                                    }
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                {data.location &&
                                <a href={`https://gps-coordinates.org/my-location.php?lat=${data.location.split(',')[0]}&lng=${data.location.split(',')[1]}`} target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-map-marker-check"/>
                                    Lokacija
                                </a>
                                }
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
                                    <Link to={`/site/employer/${data.employer.id}`}>
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
                                    {readOnly && data?.description
                                        ? data.description.split('\n').map(row => (<p style={{ margin: 0, padding: 0 }}>{row}</p>))
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
                            {userInfo?.doer && userInfo.doer === true &&
                                <Col span={6}>
                                    <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        onClick={() => setShowSubmitModal(true)}
                                    >
                                        Prijavi se za posao
                                    </Button>
                                </Col>
                            }
                            <Col span={6}>
                                {readOnly
                                    ? <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        danger
                                        onClick={() => setShowModal(true)}
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
                {submissions && submissions.length > 0 &&
                <div className="content">
                    <List
                        size="small"
                        bordered
                        dataSource={submissions}
                        renderItem={item => (
                            <List.Item>
                                <div style={{ width: '100%' }}>
                                    <Row style={{ width: '100%' }}>
                                        <Col span={2}>
                                            <Avatar src={item.doer.profile_pic} />
                                        </Col>
                                        <Col span={20}>
                                            <Link to={`/site/doer/${item.doer.id}`}>
                                                {item.doer.user_profile.first_name + ' ' + item.doer.user_profile.last_name}
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row style={{ width: '100%' }}>
                                        <Col offset={2} span={22}>
                                            {item.offer}
                                        </Col>
                                    </Row>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                }
                <Modal
                    okText="Prijavi"
                    cancelText="Poništi"
                    visible={showModal}
                    onOk={reportJob}
                    onCancel={() => {
                        setShowModal(false);
                        form.resetFields();
                    }}
                    closable={true}
                >
                    <h2>Prijava sumnjivog posla</h2>
                    <Row justify="space-between" style={{ marginTop: 20 }}>
                        <Col span={3}>
                            <p style={{ padding: 6 }}>Opis: </p>
                        </Col>
                        <Col span={20}>
                            <Form
                                form={form}
                            >
                                <Form.Item
                                    name="description"
                                >
                                    <Input.TextArea
                                        placeholder="Ovde napišite zašto prijavljujete posao."
                                        autoSize={true}
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
                <Modal
                    okText="Prijavi"
                    cancelText="Poništi"
                    visible={showSubmitModal}
                    onOk={submitRequest}
                    onCancel={() => {
                        setShowSubmitModal(false);
                        submitForm.resetFields();
                    }}
                    closable={true}
                >
                    <h2>Prijavite se za posao</h2>
                    <Row justify="space-between" style={{ marginTop: 20 }}>
                        <Col span={3}>
                            <p style={{ padding: 6 }}>Opis: </p>
                        </Col>
                        <Col span={20}>
                            <Form
                                form={submitForm}
                            >
                                <Form.Item
                                    name="offer"
                                >
                                    <Input.TextArea
                                        placeholder="Dodatne informacije."
                                        autoSize={true}
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
            </Spin>
        </div>
    );
};

export default Job;