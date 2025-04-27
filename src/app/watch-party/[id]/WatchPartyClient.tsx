"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type WatchPartyClientProps = {
  id: string;
};

export default function WatchPartyClient({ id }: WatchPartyClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<any>(null);
  useEffect(()=>{
    fetchWatchPartyVideo();
  },[id])

  const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
  };

  const fetchWatchPartyVideo = async ()=>{
    const res = await axios.post('/api/session/fetch', {id});
    setVideoData(res.data);
    console.log(res.data);
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">🎥 Watch Party</h1>

      {videoData?.signedUrl ? (
        <div className="w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={videoData.signedUrl}
            className="w-full h-auto rounded-2xl"
            onContextMenu={handleContextMenu}
            controlsList="nodownload"
          />
          <div className="p-4 bg-gray-800">
            <h2 className="text-xl font-semibold">{videoData.title}</h2>
            {/* <p className="text-gray-400 text-sm mt-1">Uploaded by: {videoData.user?.name || "Unknown"}</p> */}
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No video found for this session.</p>
      )}
    </div>
  );
}
