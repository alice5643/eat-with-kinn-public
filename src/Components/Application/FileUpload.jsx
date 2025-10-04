import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const FileUpload = ({
    label,
    description,
    accept = "image/*,.pdf",
    maxSizeMB = 5,
    onUploadComplete,
    userId,
    existingFileUrl = null
}) => {
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState(existingFileUrl);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        setError(null);
        setUploading(true);

        try {
            // Create unique file path: userId/timestamp-filename
            const timestamp = Date.now();
            // eslint-disable-next-line no-unused-vars
            const fileExt = file.name.split('.').pop();
            const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
            const filePath = `${userId}/${fileName}`;

            // Upload to Supabase Storage
            // eslint-disable-next-line no-unused-vars
            const { data, error: uploadError } = await supabase.storage
                .from('seller-documents')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('seller-documents')
                .getPublicUrl(filePath);

            setFileUrl(publicUrl);
            onUploadComplete(publicUrl);
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <label className="text-body-md font-medium text-Mblack mb-2 block">
                {label}
            </label>
            {description && (
                <p className="text-body-sm text-gray-600 mb-3">{description}</p>
            )}

            <div className="relative">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                    id={`file-upload-${label.replace(/\s+/g, '-')}`}
                />
                <label
                    htmlFor={`file-upload-${label.replace(/\s+/g, '-')}`}
                    className={`flex items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-[12px] cursor-pointer ${
                        uploading
                            ? 'bg-gray-100 border-gray-300'
                            : 'bg-gray-50 border-gray-300 hover:border-[#FEC51C] hover:bg-gray-100'
                    }`}
                >
                    <div className="text-center">
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <svg className="animate-spin h-8 w-8 text-[#FEC51C] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-body-sm text-gray-500">Uploading...</span>
                            </div>
                        ) : fileUrl ? (
                            <div className="flex flex-col items-center">
                                <svg className="w-8 h-8 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-body-sm text-green-600 font-medium">File uploaded successfully</span>
                                <span className="text-body-xs text-gray-500 mt-1">Click to replace</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-body-sm text-gray-600">
                                    <span className="font-medium text-[#FEC51C]">Click to upload</span> or drag and drop
                                </span>
                                <span className="text-body-xs text-gray-500 mt-1">PDF or images up to {maxSizeMB}MB</span>
                            </div>
                        )}
                    </div>
                </label>
            </div>

            {error && (
                <p className="text-body-sm text-red-600 mt-2">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;