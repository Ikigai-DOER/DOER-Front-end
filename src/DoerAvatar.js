import React from "react";
import {Avatar} from "antd";
import DoerBadge from "./DoerBadge";

const DoerAvatar = props => (
    <span>
        <Avatar
            shape="circle"
            size={200}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/220px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"
            alt="Linus Torvalds"
        />
            <DoerBadge status={'online'}/>
    </span>
);

export default DoerAvatar;