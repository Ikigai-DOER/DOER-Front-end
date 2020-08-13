import React from "react";
import {Avatar} from "antd";
import DoerBadge from "./DoerBadge";

const DoerAvatar = ({ status, src }) => (
    <span>
        <Avatar
            shape="circle"
            size={200}
            src={src}
            alt="Linus Torvalds"
        />
            <DoerBadge status={status} />
    </span>
);

export default DoerAvatar;