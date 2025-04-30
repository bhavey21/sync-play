"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket"; // Make sure this file is set up properly

type WatchPartyClientProps = {
  id: string;
};

export default function WatchPartyClient({ id }: WatchPartyClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    fetchWatchPartyVideo();
  }, [id]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.emit("join-room", id); // joining room using session id

      socket.on("change-state", (data: any) => {
        if (videoRef.current) {
          if (data.play) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      });

      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
  };

  const fetchWatchPartyVideo = async () => {
    const res = await axios.get("/api/session", {
      params: { id }
    });
    setVideoData(res.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">🎥 Watch Party</h1>

      {videoData?.signedUrl ? (
        <div className="relative w-full max-w-md shadow-2xl rounded-2xl overflow-hidden">
          {/* Video Player */}
          <video
            ref={videoRef}
            src={videoData.signedUrl}
            className="w-full h-auto rounded-2xl"
            onContextMenu={handleContextMenu}
            controlsList="nodownload"
            controls
          />

          {/* Watermark */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <span className="text-red-700 text-4xl font-bold opacity-30">Copyrighted</span>
          </div>

          <div className="p-4 bg-gray-800">
            <h2 className="text-xl font-semibold">{videoData.title}</h2>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No video found for this session.</p>
      )}
    </div>
  );
}
