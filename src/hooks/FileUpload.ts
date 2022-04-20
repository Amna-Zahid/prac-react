import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage"
const useFileUpload = () => {
    const [files, setFiles] = useLocalStorage<any[]>('files', []);

    const getFileMetadata = (file: any) => ({
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
    });

    const fileToBase64 = async (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);
        });

    const clearFiles = () => {
        setFiles([]);
    }

    const handleUpload = async (e: any) => {
        let newstate: any[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            const metadata = getFileMetadata(file);
            const url = URL.createObjectURL(file);
            const image64 = await fileToBase64(file);
            newstate = [...newstate, { url, metadata, image64 }];
        }
        setFiles(newstate);
    };

    return {
        files,
        handleUpload,
        clearFiles
    };
};

export default useFileUpload;
