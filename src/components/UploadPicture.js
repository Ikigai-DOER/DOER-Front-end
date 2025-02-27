import React, {useState} from 'react'
import {UploadOutlined} from '@ant-design/icons';
import {Modal, Row} from "antd";

const FileUpload = React.forwardRef((props, ref) => {
    const [file, setFile] = useState(props.picture);
    const [bigPicture, setBigPicture] = useState(false);
    const [error, setError] = useState(false);


    // const s = useSelector(stringsSelector);

    const handleInput = event => {
        if (event.target.files[0].type === 'image/png' ||
            event.target.files[0].type === 'image/jpg' ||
            event.target.files[0].type === 'image/jpeg') {
            setError(false);
            setFile(URL.createObjectURL(event.target.files[0]));
        } else {
            setError(true);
        }
    }

    return <div className='upload'>
        <span style={{color: '#ff525a'}}>{error ? 'Samo slike!' : null}</span>

        <img style={{maxHeight: '150px', marginBottom: '15px'}}
             src={file ? file : (props.imageUrl ? props.imageUrl : '')}
             alt=""
             onClick={() => setBigPicture(true)}/>

        <label className='upload-button'>
            <Row>
                <UploadOutlined style={{marginRight: '6px'}}/>
                <input type='file'
                       ref={ref}
                       accept={props.accept}
                       multiple={props.multiple}
                       onChange={handleInput}
                />
            </Row>
        </label>

        <Modal
            width={'740px'}
            height={'1280px'}
            onCancel={() => setBigPicture(false)}
            closable={false}
            visible={bigPicture}
            title=""
            footer={false}
            centered={true}
        >

            <img className="big-image"
                 style={{maxHeight: '1280px', maxWidth: '720px', width:'100%', height:'100%'}}
                 src={file ? file : (props.imageUrl ? props.imageUrl : '')}
                 alt=""/>

        </Modal>
    </div>
});

export default FileUpload;
