import React from 'react';
import './DoerBadge.css';

const getStatusString = (status) => {
    switch (status) {
        case 'A':
            return 'online';
        case 'B':
            return 'busy';
        default:
            return 'unavailable';
    }
};

const DoerBadge = ({ status }) => (
    <div className={`doer-badge doer-badge--${getStatusString(status)}`}>
        {getStatusString(status) || 'status'}
    </div>
);

export default DoerBadge;