import React from 'react';
import {Tag} from "antd";
import {getAvailabilityColor, getAvailabilityString} from "../utils";

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