import React from 'react'

//Router
import {useHistory} from "react-router";

//Ant components
import {Button, Col, Modal, Row} from "antd";
import api from "../api";

function LogoutModal(props) {
    let history = useHistory();

    return <Modal
        title="Jeste li sigurni?"
        footer={null}
        visible={props.visible}
        onCancel={props.callBack}
    >
        <Row justify='center'>
            <Col span={9}>
                <Button
                    block={true}
                    type='default'
                    size='large'
                    onClick={props.callBack}
                >
                    Ne
                </Button>
            </Col>

            <Col offset={6} span={9}>
                <Button
                    block={true}
                    type='primary'
                    size='large'
                    onClick={() => {
                        api.logout()
                            .then(() => history.push('/'));
                    }}
                >
                    Da
                </Button>
            </Col>
        </Row>
    </Modal>
}

export default LogoutModal;
