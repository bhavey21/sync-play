'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

type VideoData = {
  videoUrl: string;
  name: string;
};

export default function VideoPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;
  const router = useRouter();

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [creatingSession, setCreatingSession] = useState(false);
  const [session, setSession] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      try {
        const res = await axios.get<{ video: VideoData, session: any }>(
          `/api/video/detail/${encodeURIComponent(id)}`
        );
        console.log(res.data);
        setVideoData(res.data.video);
        setSession(res.data.session)
      } catch (error) {
        console.error('Failed to fetch video data', error);
      }
    };
    fetchVideo();
  }, [id]);

  const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
  };

  const createSession = async () => {
    setCreatingSession(true);
    try {
      const res = await axios.post(
        '/api/session/create',
        { id: id }
      );
      setSession(res.data.session);
    } catch (error) {
      console.error('Failed to create session', error);
    } finally {
      setCreatingSession(false);
    }
  };

  const changeSessionState = async () =>{
    
  }

  if (!videoData) {
    return <div className="text-white p-4">Loading video...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-2xl mb-4">{videoData.name}</h1>

      {session ?
        <>
          <div className="flex gap-4 mb-6">
            <button
              onClick={createSession}
              disabled={creatingSession}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded cursor-pointer"
            >
              Delete Watch Party
            </button>

            <button
              onClick={changeSessionState}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded cursor-pointer"
            >
              Play
            </button>

            <button
              onClick={changeSessionState}
              disabled={creatingSession}
              className="bg-red-400 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded cursor-pointer"
            >
              Pause
            </button>
          </div>
        </>
        : <button
          onClick={createSession}
          disabled={creatingSession}
          className="mb-6 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          {creatingSession ? 'Creating Session…' : 'Create Watch Party'}
        </button>}

      <div className="relative w-full max-w-3xl">
        <video
          ref={videoRef}
          src={videoData.videoUrl}
          controls
          className="w-full rounded-xl shadow-lg"
          onContextMenu={handleContextMenu}
          controlsList="nodownload"
        />
      </div>
    </div>
  );
}
