'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AddVideo() {
    const [name, setName] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !videoFile) {
            alert('Please enter a name and select a video file.');
            return;
        }

        setUploading(true);

        try {
            // Step 1: Get presigned URL from your API
            const { data } = await axios.post('/api/video/s3upload/upload', {
                fileName: videoFile.name,
                fileType: videoFile.type,
            });

            const presignedUrl = data.url;

            // Step 2: Upload file directly to S3 using the URL
            await axios.put(presignedUrl, videoFile, {
                headers: {
                    'Content-Type': videoFile.type,
                },
            });

            await axios.post('/api/video/s3upload/success', {
                name: name,
                key: data.key,
            });

            alert('Upload successful!');
            setName('');
            setVideoFile(null);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed. See console for details.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Video</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        required
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}
