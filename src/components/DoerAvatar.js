import React from "react";
import {Avatar} from "antd";
import DoerBadge from "./DoerBadge";

const DoerAvatar = ({ status, src, alt }) => (
    <span>
        <Avatar
            shape="circle"
            size={200}
            src={src}
            alt={alt}
        />
            <DoerBadge status={status} />
    </span>
);

export default DoerAvatar;