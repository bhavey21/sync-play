'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListVideo() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/video/list');
        setVideos(res.data.videos);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/video/${id}`);
      setVideos(videos.filter((video: any) => video._id !== id));
    } catch (err) {
      console.error('Failed to delete video', err);
    }
  };

  const handleView = (key: string) => {
    const url = `/dashboard/video/detail?id=${key}`; // Update this if your stream URL differs
    window.open(url, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-yellow-100 rounded-2xl shadow-lg max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Video List</h2>
      {videos.length === 0 ? (
        <p className="text-gray-600">No videos found.</p>
      ) : (
        <ul className="space-y-3">
          {videos.map((video: any) => (
            <li key={video._id} className="p-3 bg-white rounded-xl shadow">
              <div className="flex justify-between items-center">
                <div>
                  🎥 <span className="font-semibold">{video.name}</span>
                  <div className="text-sm text-gray-500">
                    {video.createdAt
                      ? `Uploaded on ${formatDate(video.createdAt)}`
                      : 'Upload date unknown'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(video._id)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    disabled={true}
                    onClick={() => handleDelete(video._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
