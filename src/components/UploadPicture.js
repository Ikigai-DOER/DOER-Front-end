import React, {useContext, useEffect, useState} from "react";
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import UserContext from "../UserContext";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


const UploadPicture = (props) => {
    const [state, setState] = useState({loading: false, imageUrl: props.imageUrl});
    const {userInfo} = useContext(UserContext);

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            state.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            // getBase64(info.file.originFileObj, _ => {
            //     setState({
            //         loading: false,
            //     });
            // });
            setState({loading: false});
            console.log('slika', info.file.originFileObj)
            userInfo.user.profile_pic = info.file.originFileObj;

        }
    };

    const uploadButton = (
        <div>
            {state.loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div className="ant-upload-text">Dodajte sliku</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {state.imageUrl ? <img src={state.imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
        </Upload>
    );
}

export default UploadPicture;
