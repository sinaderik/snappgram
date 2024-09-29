import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
    fieldChange: (files: File[]) => void,
    mediaUrl: string,
}
const FileUploader = ({ fieldChange, mediaUrl }:FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState('')

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', 'jpeg', 'png', 'svg'] }
    })

    return (
        <div className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer' {...getRootProps()}>
            <input className='cursor-pointer' {...getInputProps()} />
            {
                fileUrl ?
                    (
                        <div>
                            <p>file url exist</p>
                        </div>
                    ) :
                    (
                        <div className='file_uploader-box'>
                            <img
                                src="/assets/icons/file-upload.svg"
                                alt="file-upload"
                                width={96}
                                height={77}
                            />
                            <h3 className='text-light-2 base-medium mb-2 mt-6'>Drag photo here</h3>
                            <p className='text-light-4 small-regular mb-6'>PNG , SVG , JPG</p>
                            <Button className='shad-button_dark_4'>
                                Browse
                            </Button>
                        </div>
                    )
            }
        </div>
    )
}

export default FileUploader