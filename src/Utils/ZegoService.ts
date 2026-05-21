import { useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../Redux/Store/Store";
import { ReactNode } from "react";
import showToast from "./Toaster";

const FALLBACK_APP_ID = 768846959;
const FALLBACK_SERVER_SECRET = "f2e0ce1944226d96437a02fca09518a8";

let zegoInstance: ZegoUIKitPrebuilt | null = null;

export function getAppointmentRoomId(appointmentId: string): string {
  return `appointment-${appointmentId}`;
}

export function getZegoConfig(): { appID: number; serverSecret: string } | null {
  const envAppId = import.meta.env.VITE_ZEGO_APP_ID;
  const envSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

  const appID = envAppId ? Number(envAppId) : FALLBACK_APP_ID;
  const serverSecret = envSecret || FALLBACK_SERVER_SECRET;

  if (!appID || Number.isNaN(appID) || !serverSecret) {
    return null;
  }

  return { appID, serverSecret };
}

export function getZegoInstance(): ZegoUIKitPrebuilt | null {
  return zegoInstance;
}

export function initZegoUIKit(
  userID: string,
  userName: string,
  roomID = ""
): ZegoUIKitPrebuilt | null {
  const config = getZegoConfig();
  if (!config) {
    showToast(
      "Video calls are not configured. Set VITE_ZEGO_APP_ID and VITE_ZEGO_SERVER_SECRET in .env",
      "error"
    );
    return null;
  }

  const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
    config.appID,
    config.serverSecret,
    roomID,
    String(userID),
    String(userName)
  );

  zegoInstance = ZegoUIKitPrebuilt.create(token);
  zegoInstance.addPlugins({ ZIM });
  zegoInstance.setCallInvitationConfig({});
  return zegoInstance;
}

export function destroyZegoUIKit(): void {
  if (zegoInstance) {
    zegoInstance.destroy();
    zegoInstance = null;
  }
}

export const ZegoCloud = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.UserSlice);
  const doctor = useAppSelector((state) => state.DoctorSlice);

  const isUser = user.isAuthenticated && user.role === "user";
  const isDoctor = doctor.isAuthenticated && doctor.role === "doctor";
  const userID = isUser ? user.id : isDoctor ? doctor.id : null;
  const userName = isUser ? user.name : isDoctor ? doctor.name : null;

  useEffect(() => {
    if (!userID || !userName) {
      return;
    }

    initZegoUIKit(String(userID), String(userName));

    return () => {
      destroyZegoUIKit();
    };
  }, [userID, userName]);

  return children;
};

export default ZegoCloud;
