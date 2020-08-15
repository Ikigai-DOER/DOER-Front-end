import React from 'react';
import {Tag} from "antd";

export const getAvailabilityString = availability => {
    switch (availability) {
        case 'A':
            return 'Available';
        case 'C':
            return 'Closed';
        case 'D':
            return 'Done';
        default:
            return 'In progress';
    }
};

export const getAvailabilityColor = availability => {
    switch (availability) {
        case 'A':
            return 'green';
        case 'C':
            return 'red';
        case 'D':
            return 'grey';
        default:
            return 'blue';
    }
};

const Availability = ({ availability }) => {
    return (
        <Tag
            color={getAvailabilityColor(availability)}
        >
            {getAvailabilityString(availability)}
        </Tag>
    );
};

export default Availability;