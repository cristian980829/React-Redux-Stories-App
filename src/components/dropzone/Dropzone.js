import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storieAddImage, storieIsValidImages, storieRemoveImages } from '../../actions/storie';

import './Dropzone.css';

const Dropzone = () => {

    const initialImage = {
        name: '',
        file: ''
    }

    const fileInputRef = useRef();
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(initialImage)


    const dispatch = useDispatch();
    const { images } = useSelector( state => state.storie );

    useEffect(() => {
        let filteredArr = images.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);
        if(unsupportedFiles.length > 0){
            dispatch(storieIsValidImages(false));
        }else{
            dispatch(storieIsValidImages(true));
        }
    }, [images, unsupportedFiles, dispatch]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
            
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                dispatch(storieAddImage(files[i]));
            } else {
                files[i]['invalid'] = true;
                dispatch(storieAddImage(files[i]));
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = [ 'image/gif', 'image/x-icon', 'image/webp'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
          return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (file) => {
        const index = validFiles.findIndex(e => e.name === file.name);
        const index3 = unsupportedFiles.findIndex(e => e.name === file.name);
        validFiles.splice(index, 1);
        setValidFiles([...validFiles]);
        dispatch(storieRemoveImages([...validFiles]));

        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }

        if(imagePreview.name===file.name || validFiles.length < 1){
            setImagePreview(initialImage);
        }
    }

    const openImageView = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            setImagePreview({name:file.name, file: e.target.result})
        }
    }

    return (
        <>
            <div className="container">
                <div className="drop-container pointer"
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                >
                    <div className="drop-message pointer">
                        <div className="upload-icon"></div>
                        Drag & Drop files here or click to select file(s)
                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>

                {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
                
                {
                    validFiles.map((data, i) => 
                        <div className="file-status-bar" key={i}>
                            <div className="pointer" onClick={!data.invalid ? () => openImageView(data) : () => removeFile(data.name)}>
                                <div className="file-type-logo"></div>
                                <div className="file-type">{fileType(data.name)}</div>
                                <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name.substring(0, 16) + "..."}</span>
                                <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                            </div>
                                <div className="file-remove" onClick={() => removeFile(data)}>X</div>
                        </div>
                    )
                }

                {(validFiles.length > 0 && imagePreview.file) && <div>
                    <img
                        src={`${imagePreview.file}`}
                        alt={imagePreview.file}
                        className="img-storie"
                    />
                </div>}

            </div>
            

        </>
    );
}

export default Dropzone