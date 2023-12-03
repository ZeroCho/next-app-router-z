"use client";

import useSocket from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";

export default function WebSocketComponent() {
  useSocket();
  return null;
}