import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {gql, useMutation} from "@apollo/client";

const UPLOAD_FILE = gql`
    mutation UploadFile($file: Upload!) {
        singleUpload(file: $file)
    }
`;

const UploadFile = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } });
        },
        [uploadFile]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default UploadFile
