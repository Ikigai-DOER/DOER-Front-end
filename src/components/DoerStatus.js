import React from 'react';
import {Tag} from "antd";

const getStatusColor = status => {
    switch (status) {
        case 'A':
            return 'green';
        case 'B':
            return 'red';
        default:
            return 'grey';
    }
};

const getStatusString = status => {
    switch (status) {
        case 'A':
            return 'Available';
        case 'B':
            return 'Busy';
        default:
            return 'Unavailable';
    }
};

const DoerStatus = ({ status }) => {
    return (
        <Tag
            color={getStatusColor(status)}
        >
            {getStatusString(status)}
        </Tag>
    );
};

export default DoerStatus;