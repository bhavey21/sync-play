"use client";
import { io } from "socket.io-client";

export const socket = io({
  path: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/socket.io`,
});