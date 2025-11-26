/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useRef } from "react";

interface Props {
  token: string | null;
  onClose?: () => void;
}

export default function PaymentPopup({ token, onClose }: Props) {
  const hasPayBeenCalled = useRef(false);

  // Load script 1x
  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL!;
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Popup when token update
  useEffect(() => {
    if (!token) return;
    if (hasPayBeenCalled.current) return;
    hasPayBeenCalled.current = true;
    // @ts-expect-error → tipe window.snap
    window.snap.pay(token, {
      onSuccess: function (result: void) {
        console.log("success", result);
      },
      onPending: function (result: void) {
        console.log("pending", result);
      },
      onError: function (result: void) {
        console.log("error", result);
      },
      onClose: function () {
        onClose && onClose();
        console.log("popup closed");
      },
    });
  }, [onClose, token]);

  return null; // show nothing
}
