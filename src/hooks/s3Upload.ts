import {ChangeEvent, useState, useEffect   } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {v4 as uuid} from "uuid";

// @ts-ignore
import S3 from 'aws-s3';
import {getSignedUrl, putSignedAsset} from "../api/GoalsApi";


const config = {
    bucketName: 'goal-templates-temp-files',
    dirName: 'images', /* optional */
    region: 'eu-west-2',
    accessKeyId: 'AKIAYKOG5QENQG5G3EYR',
    secretAccessKey: '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',
}

const s3Client = new S3(config);
const getFileExtension = (filename: string): string => filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename

export interface FileMetaData {
    lastModified: number;
    name: string;
    size: number;
    type: string;
}

export interface S3File {
    url: string;
    metadata: FileMetaData;
}

export type FileError = {toggle: boolean, message: string};

export interface UseS3FileUploadReturnType {
    files: S3File[];
    handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    clearFiles: () => void;
    uploadError: FileError;
    fileLoader: boolean;
}

const useS3FileUpload = (key="files", fileType: "image" | "video" = "image"): UseS3FileUploadReturnType => {
    const [files, setFiles] = useLocalStorage<S3File[]>(key, []);
    const [error, setError] = useState<FileError>({toggle: false, message: ''});
    const [fileLoader, setFileLoader] = useState<boolean>(false);

    const getFileMetadata = (file: File): FileMetaData => ({
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        // webkitRelativePath: file.webkitRelativePath,
    });



    const clearFiles = () => {
        setFiles([]);
    }

    const handleUpload = async ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if(files && files.length > 0) {
            let newState: S3File[] = [];
            const typeCheck = files[0].type.includes(fileType);
            const fileSize = Math.floor(files[0].size / 1000000);
            if (typeCheck && fileSize <= 5) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const extension = getFileExtension(file.name);
                    // const filename = `${uuid()}.${extension}`;
                    const filename = `${uuid()}`;
                    try {
                        setFileLoader(true);
                        const presignedUrl = await getSignedUrl(file.type);
                        console.log('file: ', file);
                        const response = await fetch(presignedUrl.data.signedRequest, {
                            method: 'PUT',
                            body: file
                        });
                        console.log({ response });
                        // const image = await s3Client.uploadFile(file, filename);
                        setFileLoader(false);
                        // console.log(image);
                        if (response.ok) {
                            const metadata = getFileMetadata(file);
                            const url = presignedUrl.data.url;
                            newState = [...newState, { url, metadata }];
                        }
                    } catch (e) {
                        setFileLoader(false)
                        console.log(e);
                    }

                }
                setFiles(newState);
            } else {
                if (!typeCheck) {
                    setError({toggle: true, message: 'Not a valid format'});
                } else {
                    setError({toggle: true, message: 'File must be equal to or less than 5Mb'});

                }

                setTimeout(() => {
                    setError({toggle: false, message: ''});
                }, 2000);
            }

        }

    };

    return {
        files,
        handleUpload,
        clearFiles,
        uploadError: error,
        fileLoader
    };
};

export default useS3FileUpload;