import React from 'react';
import './DoerBadge.css';

const DoerBadge = ({ status }) => (
    <div className={`doer-badge doer-badge--${status}`}>
        {status || 'status'}
    </div>
);

export default DoerBadge;